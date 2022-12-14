import Axios from 'axios'
import { message } from 'antd'

import { startLoading, stopLoading } from '@redux/slice/loadingAnimSlice'
import { removeUserInfo } from '@redux/slice/userSlice'
import localServices from '@services/local.service'
import localService from '@services/local.service'
import store from '../index'

class AxiosFormData {
  axios
  axiosConfig
  authService

  constructor() {
    this.axios = Axios.create({
      baseURL: this.getBaseUrl(),
      timeout: 15000,
      mode: 'cors',
    })
    this.getAxiosConfig()
  }

  getBaseUrl() {
    return process.env.REACT_APP_API_BASE_URL
  }

  getAxiosConfig() {
    const token = localServices.getAccessToken()
    this.axiosConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, GeneralProfile-Type, X-Auth-Token, X-Requested-With, Authorization',
        'Content-Type': 'multipart/form-data',
        'Authorization': token,
      },
    }
  };

  postMethod(data, loading = true) {
    return this.handleFlow(
      this.axios.post('', data, this.axiosConfig),
      loading,
    )
  }

  handleFlow(method, loading = true) {
    loading && store.dispatch(startLoading())
    return new Promise((resolve, reject) => {
      method
        .then((res) => {
          loading && store.dispatch(stopLoading())
          if (res.data.errors) {
            this.handleError(res.data.errors)
          }
          resolve(res.data)
        })
        .catch((err) => {
          loading && store.dispatch(stopLoading())
          this.handleError(err)
          reject(err)
        })
    })
  }

  handleError = (error) => {
    if (error?.message) {
      message.error(error.message, 2)
      return false
    }
    const firstError = error[0]
    switch (firstError.status) {
      case 404: {
        message.error(firstError.message, 3)
        break
      }
      case 401: {
        message.error(firstError.message, 3)
        localService.removeUserInfo()
        setTimeout(() => {
          window.location.href = '/login'
        }, 3000)
        removeUserInfo()
        break
      }
      case 406: {
        message.warning(firstError.message, 3)
        break
      }
      case 403: {
        message.error(firstError.message, 3)
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
        break
      }
      case 400: {
        message.error(firstError.message, 3)
        break
      }
      default:
        message.error(firstError.message, 3)
        break
    }
  }
  //
  axiosInstance = (req) => {
    this.axios(req, this.axiosConfig)
  }
}

const axiosLocal = new AxiosFormData()
export default axiosLocal
