import { baseInstance } from './index'

export const numberInfo = (id) => baseInstance.get(`/number_id?id=${id}`)
export const numberManagerInfo = () => baseInstance.get(`/number_manager`)
export const numberManagerUploadImage = (data) =>
  baseInstance.post(`/number_manager_image`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const numberManagerUploadAlbum = (data) =>
  baseInstance.post(`/number_manager_album`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const numberEdit = (data) => baseInstance.post(`/number_edit`, data)
export const numberAdd = (data) => baseInstance.post(`/number_add`, data)
