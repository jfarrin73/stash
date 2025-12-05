import { useCallback, useEffect, useRef } from "react"

export interface UseIntersectionOptions extends IntersectionObserverInit {
  triggerOnce?: boolean
  enabled?: boolean
}

export function useIntersection(
  onIntersect: (entry: IntersectionObserverEntry) => void,
  { 
    threshold = 0, 
    root = null, 
    rootMargin = "0%", 
    triggerOnce = false,
    enabled = true
  }: UseIntersectionOptions = {}
) {
  const onIntersectRef = useRef(onIntersect)
  const observerRef = useRef<IntersectionObserver | null>(null)
  
  useEffect(() => {
    onIntersectRef.current = onIntersect
  })

  const ref = useCallback(
    (element: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      if (!element || !enabled) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onIntersectRef.current(entry)
            
            if (triggerOnce) {
              observer.disconnect()
            }
          }
        },
        { root, rootMargin, threshold }
      )

      observer.observe(element)
      observerRef.current = observer
    },
    [threshold, root, rootMargin, triggerOnce, enabled]
  )

  return ref
}