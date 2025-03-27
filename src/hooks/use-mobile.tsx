
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Check immediately
    checkMobile()
    
    // Set up listener for window resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern approach with addEventListener
    if (mql.addEventListener) {
      mql.addEventListener("change", checkMobile)
      return () => mql.removeEventListener("change", checkMobile)
    } 
    // Fallback for older browsers
    else {
      // @ts-ignore - For older browsers
      mql.addListener(checkMobile)
      return () => {
        // @ts-ignore - For older browsers
        mql.removeListener(checkMobile)
      }
    }
  }, [])

  // Return false as fallback until it's definitely known
  return isMobile === null ? false : isMobile
}
