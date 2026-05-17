import * as React from "react"

const MOBILE_BREAKPOINT = 1024

function getMobileMediaQuery() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
}

export function useIsMobile() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const mql = getMobileMediaQuery()
      mql.addEventListener("change", onStoreChange)
      return () => mql.removeEventListener("change", onStoreChange)
    },
    () => getMobileMediaQuery().matches,
    () => false
  )
}
