import type { SVGProps } from "react";

export function BurgerMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 8 8" {...props}><path fill="currentColor" d="M0 1v1h8V1zm0 2.97v1h8v-1zm0 3v1h8v-1z"/></svg>
  )
}