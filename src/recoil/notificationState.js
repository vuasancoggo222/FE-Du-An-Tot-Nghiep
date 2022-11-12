/* eslint-disable no-unused-vars */
import { atom, selector } from "recoil";


export const notificationState = atom({
    key : 'notification',
    default : false
})

export const listNotification = selector({
  key : 'listNotification',
  get : ({get}) => {
    const notification = get(notificationState)
    const list = notification.listNotification
    return {
      list
    }
  }
})
export const newNotificationState = atom({
  key: 'newNotification',
  default : false
})