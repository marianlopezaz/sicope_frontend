import React from "react"
import ContentLoader from "react-content-loader" 

const SkeletonProductos = () => (
    <ContentLoader 
    speed={2}
    width={'100%'}
    height={'100%'}
    viewBox="0 0 400 160"
    backgroundColor="rgba(39, 39, 39, 0.100)"
    foregroundColor="rgba(255, 255, 255, 0.100)"
  >
    <circle cx="597" cy="228" r="20" /> 
    <rect x="30" y="8" rx="5" ry="5" width="325" height="10" />
    <rect x="10" y="28" rx="5" ry="5" width="115" height="28" /> 
    <rect x="140" y="28" rx="5" ry="5" width="115" height="28" /> 
    <rect x="59" y="34" rx="0" ry="0" width="27" height="0" /> 
    <rect x="265" y="28" rx="5" ry="5" width="115" height="28" /> 
    <rect x="10" y="70" rx="5" ry="5" width="115" height="28" /> 
    <rect x="148" y="51" rx="0" ry="0" width="0" height="1" /> 
    <rect x="140" y="70" rx="5" ry="5" width="115" height="28" /> 
    <rect x="265" y="70" rx="5" ry="5" width="115" height="28" />
  </ContentLoader>
)

export default SkeletonProductos;