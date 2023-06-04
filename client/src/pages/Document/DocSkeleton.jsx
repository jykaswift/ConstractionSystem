import React from "react"
import ContentLoader from "react-content-loader"

const DocSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={1180}
    height={700}
    viewBox="0 0 1180 700"
    backgroundColor="#ffffff"
    foregroundColor="#c2c2c2"
    {...props}
  >
    <rect x="3" y="180" rx="10" ry="10" width="100%" height="527" />
    <rect x="5" y="110" rx="10" ry="10" width="100%" height="59" />
    <rect x="8" y="38" rx="0" ry="0" width="100%" height="42" />
  </ContentLoader>
)

export default DocSkeleton