import type { GlobConfig } from '/#/config'

import { getAppEnvConfig } from '@/utils/env'

const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_COPYRIGHT,
    VITE_GLOB_LOGO,
    VITE_GLOB_QINIU_DIR,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_PROD_MOCK,
    VITE_GLOB_IMG_URL,
  } = getAppEnvConfig()

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    copyright: VITE_GLOB_COPYRIGHT,
    logo: VITE_GLOB_LOGO,
    qiniuDir: VITE_GLOB_QINIU_DIR,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
    prodMock: VITE_GLOB_PROD_MOCK,
    imgUrl: VITE_GLOB_IMG_URL,
  }
  return glob as Readonly<GlobConfig>
}

export default useGlobSetting
