/**
 * Custom API Composable
 * Wrapper untuk useFetch dengan automatic authentication via cookies
 *
 * Usage:
 * 1. Destructuring: const { data, error, status, pending, execute, refresh } = await useApi('/api/example')
 * 2. Direct: const result = await useApi('/api/example')
 *
 * Error handling:
 * - error?.value?.message contains the error message from API response body
 * - Works with HTTP status codes 401, 403, 404, 405, 409, etc.
 */

import type { UseFetchOptions } from 'nuxt/app'
import type { Ref } from 'vue'
import type { FetchError } from 'ofetch'

// Helper type for API responses
export type ApiResponse<T> = {
  data: T | any
  success?: boolean
  status?: boolean | string
  message?: string
  items?: T[]
}

// Error response type from API - allows access via error.value.message
export type ApiErrorResponse = {
  status?: boolean | string
  message?: string
  data?: unknown
}

// Result type for useApi - extends Promise for await support
interface UseApiResult<T> {
  data: Ref<ApiResponse<T> | null>
  error: Ref<ApiErrorResponse | null>
  pending: Ref<boolean>
  status: Ref<'idle' | 'pending' | 'success' | 'error'>
  refresh: () => Promise<ApiResponse<T> | null>
  execute: () => Promise<ApiResponse<T> | null>
  clear: () => void
}

// Promise-like result that can be awaited
type UseApiReturn<T> = UseApiResult<T> & PromiseLike<UseApiResult<T>>

export const useApi = <T = unknown>(
  url: string | Ref<string> | (() => string),
  options?: UseFetchOptions<ApiResponse<T>> & { immediate?: boolean }
): UseApiReturn<T> => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const baseURL = typeof apiBase === 'string' ? apiBase : '/api'

  const handleError = (errorStatus: number) => {
    // Don't redirect on public auth pages to prevent redirect loops
    const publicPages = [
      '/auth/login',
      '/auth/register',
      '/auth/forgot-password',
      '/auth/reset-password',
      '/auth/logout',
    ]
    const isPublicPage = publicPages.includes(useRoute().path)

    if (isPublicPage) {
      return
    }

    // Redirect to login on 401 (unauthorized)
    if (errorStatus === 401) {
      if (import.meta.client) {
        location.replace('/auth/login')
      } else {
        try {
          navigateTo('/auth/login', { replace: true })
        } catch (e) {
          console.error('Failed to redirect on server:', e)
        }
      }
    }
  }

  /**
   * Extract error data from FetchError or raw error object
   * Ensures error.value.message contains the API error message
   */
  const extractErrorData = (err: unknown): ApiErrorResponse => {
    const fetchError = err as FetchError<ApiErrorResponse>
    // FetchError stores response body in .data property
    if (fetchError?.data && typeof fetchError.data === 'object') {
      return fetchError.data
    }
    // Fallback to response._data
    if (fetchError?.response?._data && typeof fetchError.response._data === 'object') {
      return fetchError.response._data as ApiErrorResponse
    }
    // If err itself has message property, use it
    if (err && typeof err === 'object' && 'message' in err) {
      return { message: (err as { message?: string }).message }
    }
    return { message: 'An unexpected error occurred' }
  }

  // Determine if we should use $fetch instead of useFetch
  // Use $fetch for:
  // 1. Explicit immediate: false (manual triggers) - ensures consistent return type with execute()
  // 2. POST/PUT/PATCH/DELETE requests (mutations should not auto-execute in SSR)
  // 3. Client-side requests AFTER hydration (client navigation should use $fetch)
  const method = (unref(options?.method) || 'GET').toUpperCase()
  const isMutationMethod = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
  const isManualTrigger = options?.immediate === false

  // Check if we're past the hydration phase on the client
  // During hydration, GET requests should use useFetch to access SSR payload
  const nuxtApp = useNuxtApp()
  const isClientAfterHydration = import.meta.client && !nuxtApp.isHydrating

  // Use $fetch for mutations, manual triggers (immediate: false), or client-side requests after hydration
  // This ensures SSR data is reused during initial hydration and not re-fetched
  if (isMutationMethod || isManualTrigger || isClientAfterHydration) {
    const data = ref<ApiResponse<T> | null>(null)
    const error = ref<ApiErrorResponse | null>(null)
    const pending = ref(false)
    const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')

    const execute = async (): Promise<ApiResponse<T> | null> => {
      pending.value = true
      status.value = 'pending'
      error.value = null

      try {
        const resolvedUrl = typeof url === 'function' ? url() : unref(url)
        const response = await $fetch<ApiResponse<T>>(resolvedUrl, {
          baseURL,
          method: unref(options?.method) || 'GET',
          body: unref(options?.body),
          query: unref(options?.query),
          credentials: 'include',
          onResponseError({ response }) {
            handleError(response.status)
            if (import.meta.env.DEV) {
              console.error('API Error Response:', response._data)
            }
          },
        })

        data.value = response
        status.value = 'success'
        return response
      } catch (err: unknown) {
        // Extract and store the error response data for easy access via error.value.message
        const errorData = extractErrorData(err)
        error.value = errorData
        status.value = 'error'

        const fetchError = err as FetchError
        const errStatus =
          fetchError?.status || fetchError?.statusCode || fetchError?.response?.status
        if (typeof errStatus === 'number') {
          handleError(errStatus)
        }

        if (import.meta.env.DEV) {
          console.error('API Error:', err)
        }

        // Don't throw, just set error state so caller can check
        return null
      } finally {
        pending.value = false
      }
    }

    const refresh = (): Promise<ApiResponse<T> | null> => execute()
    const clear = (): void => {
      data.value = null
      error.value = null
      status.value = 'idle'
    }

    // Create the result object
    const result = {
      data: data as Ref<ApiResponse<T> | null>,
      error: error as Ref<ApiErrorResponse | null>,
      pending,
      status,
      refresh,
      execute,
      clear,
    }

    // Create a promise that resolves when the initial request completes
    // This allows: const { data, error } = await useApi(...)
    let initialPromise: Promise<UseApiResult<T>>

    if (options?.immediate === false) {
      // If immediate is false, resolve immediately without executing
      initialPromise = Promise.resolve(result)
    } else {
      // Execute and wait for completion before resolving
      initialPromise = execute().then(() => result)
    }

    // Return a Promise-like object that also has the result properties
    // This allows both: await useApi(...) and useApi(...) without await
    return Object.assign(initialPromise, result, {
      then: initialPromise.then.bind(initialPromise),
    }) as UseApiReturn<T>
  }

  // Use useFetch for SSR and initial hydration
  const requestHeaders = useRequestHeaders(['cookie'])

  // Prepare headers - merge with request headers on server side
  const headersValue = options?.headers
  const mergedHeaders = import.meta.server
    ? {
        ...(headersValue && typeof headersValue === 'object' ? headersValue : {}),
        ...requestHeaders,
      }
    : headersValue

  const fetchResult = useFetch<ApiResponse<T>>(url, {
    baseURL,
    method: options?.method || 'GET',
    body: options?.body,
    query: options?.query,
    headers: mergedHeaders as Record<string, string> | undefined,
    credentials: 'include',
    ...options,
    cache: 'no-cache',
    getCachedData(key) {
      // During hydration, return the data from the payload to prevent refetch
      if (nuxtApp.isHydrating) {
        return nuxtApp.payload.data[key]
      }
      return undefined
    },
    onResponseError({ response }) {
      handleError(response.status)
    },
    onResponse({ response }) {
      if (response.status >= 400) {
        if (import.meta.env.DEV) {
          console.error('API Error Response:', response._data)
        }
      }
    },
  })

  // Transform FetchError to ApiErrorResponse for consistent error.value.message access
  const error = computed<ApiErrorResponse | null>(() => {
    if (!fetchResult.error.value) return null
    return extractErrorData(fetchResult.error.value)
  })

  // Wrap refresh and execute to return proper types
  const refresh = async (): Promise<ApiResponse<T> | null> => {
    await fetchResult.refresh()
    return fetchResult.data.value ?? null
  }

  const execute = async (): Promise<ApiResponse<T> | null> => {
    await fetchResult.execute()
    return fetchResult.data.value ?? null
  }

  // Create the result object
  const result: UseApiResult<T> = {
    data: fetchResult.data as Ref<ApiResponse<T> | null>,
    error: error as Ref<ApiErrorResponse | null>,
    pending: fetchResult.pending,
    status: fetchResult.status as Ref<'idle' | 'pending' | 'success' | 'error'>,
    refresh,
    execute,
    clear: fetchResult.clear,
  }

  // useFetch already returns a Promise-like object, so we wrap it
  // This maintains consistency with Nuxt's useFetch behavior and allows await
  const resultPromise = (fetchResult as PromiseLike<unknown>).then(() => result)

  // Combine the result object with Promise behavior
  return {
    ...result,
    then: resultPromise.then.bind(resultPromise),
  } as UseApiReturn<T>
}
