/* eslint-disable no-unused-vars */
import { atom, selector } from "recoil";


export const notificationState = atom({
    key : 'notification',
    default : false
})

export const userNotificationState = atom({
  key: 'userNotification',
  default : false
})