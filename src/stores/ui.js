import { defineStore } from 'pinia'
import { useConfirmDialog } from '@vueuse/core'
// import axios from '@/helpers/axios.js'
// import _ from 'lodash'
// import axios from '@/helpers/axios.js'
// import { useAuthStore } from '@/stores'

// const baseUrl = `${import.meta.env.VITE_API_PATH}/api/v1`
const confirmDialog = useConfirmDialog()

export const useUiStore = defineStore({
    id: 'components/ui',
    state: () => ({
        showAlert: false,
        alertTitle: '',
        alertMessage: '',
        confirmTitle: '',
        confirmMessage: '',
        confirmDialog: confirmDialog,
    }),
    getters: {},
    actions: {
        /**
         * Alert 열기
         * openAlert
         * @param {String} message
         * @param {String} title
         * @return void
         * */
        openAlert(message, title = '') {
            this.alertTitle = title
            this.alertMessage = message
            this.showAlert = true
        },

        /**
         * Alert 닫기
         * closeAlert
         * @return void
         * */
        closeAlert() {
            this.showAlert = false
            this.alertTitle = ''
            this.alertMessage = ''
        },

        /**
         * Confirm 열기
         * openAlert
         * @param {String} message
         * @param {Function} cb
         * @return Callback cb
         * */
        async openConfirm(message, cb, title) {
            this.confirmTitle = title
            this.confirmMessage = message
            const { data, isCanceled } = await this.confirmDialog.reveal()
            if (!isCanceled && data) {
                cb()
            }
        },
    },
})
