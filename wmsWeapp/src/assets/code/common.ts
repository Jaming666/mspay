export enum ReceiptStatus {
  /** 驳回 */
  'reject' = '5',
  /** 作废 */
  'invalid' = '4',
  /** 已入库 */
  'complete' = '3',
  /** 审批中 */
  'auditProcess' = '2',
  /** 待提交 */
  'waitSubmit' = '1'
}

