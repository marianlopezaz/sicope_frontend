import React from "react"
import ContentLoader from "react-content-loader" 

const GralSkeletonResponsive = () => (
    <ContentLoader 
    speed={2}
    width={'100%'}
    height={'100%'}
    viewBox="0 0 400 160"
    backgroundColor="rgba(39, 39, 39, 0.100)"
    foregroundColor="rgba(255, 255, 255, 0.100)"
  >
    <circle cx="597" cy="228" r="20" /> 
    <rect x="10" y="8" rx="5" ry="5" width="95%" height="70" /> 
    <rect x="10" y="90" rx="5" ry="5" width='95%' height="70" /> 
  </ContentLoader>
)

export default GralSkeletonResponsive;