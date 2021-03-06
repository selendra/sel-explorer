const moduleZhNameMap = {
  xTokens: '跨链挖矿',
  sudo: 'sudo',
  Withdrawal: '提现',
  xSpot: '币币交易',
  xStaking: '投票选举',
  xSystem: '系统',
  system: '系统',
  xBridgeOfBTC: 'Bitcoin桥',
  timestamp: '时间戳',
  xAssets: '资产',
  xBridgeOfSDOT: 'SDOT桥',
  xBridgeOfBTCLockup: '锁仓BTC',
  finalityTracker: '确认高度',
  xFeeManager: '手续费管理',
  grandpa: '共识',
  GrandpaFinality: '共识确认',
  xAssetsRecords: '资产记录',
  Indices: '索引',
  multiSig: '多签',
  multisig: '多签',
  'xbridge-features': '桥特性集',
  session: '会话',
  balances: '余额',
  utility: '实用工具',
  xBridgeFeatures: '桥特性集',
  xBridgeCommon: '桥基础',
  xGatewayCommon: '桥基础',
  xContracts: '合约',
  offences: '犯规',
  democracy: '民主',
  imOnline: '在线',
  xGatewayBitcoin: 'Bitcoin转接桥'
}

export const moduleEnNameMap = {
  xTokens: 'Crosschain Mining',
  sudo: 'sudo',
  Withdrawal: 'Withdrawal',
  xSpot: 'DEX',
  xStaking: 'Staking',
  xSystem: 'XSystem',
  system: 'System',
  xBridgeOfBTC: 'Bitcoin Bridge',
  timestamp: 'Timestamp',
  xAssets: 'Asset',
  xBridgeOfSDOT: 'S-DOT Bridge',
  xBridgeOfBTCLockup: 'Lock BTC',
  finalityTracker: 'Finality Trackerr',
  xFeeManager: 'Fee Manager',
  GrandpaFinality: 'Grandpa Finality',
  DepositorReward: 'Depositor Reward',
  xAssetsRecords: 'XAssets Records',
  Indices: 'Indices',
  multiSig: 'Multisig',
  multisig: 'Multisig',
  'xbridge-features': 'Bridge Features',
  balances: 'balances',
  session: 'Session',
  xBridgeFeatures: 'Bridge Features',
  xBridgeCommon: 'Bridge Common',
  xGatewayCommon: 'Bridge Common',
  xContracts: 'contracts',
  offences: 'offences',
  democracy: 'Democracy',
  imOnline: 'ImOnline',
  xGatewayBitcoin: 'Bitcoin Gateway',
  utility: 'Utility'
}

const moduleNameMap = Object.entries(moduleEnNameMap).reduce(
  (result, [key, value]) => {
    const zhValue = moduleZhNameMap[key] || value

    return {
      ...result,
      [key]: {
        zh: zhValue,
        en: value
      }
    }
  },
  {}
)

export const callZhNameMap = {
  convert_to_xrc20: '划转XRC20-BTC',
  update_schedule: '更新费用表',
  put_code: '部署合约',
  TransactionFeePaid: '交易费用已支付',
  FeePaid: '费用已付',
  xTransactionFee: '交易费',
  system: '系统',
  call: '调用合约',
  Transfer: '转账',
  Instantiated: '实例化',
  CodeStored: '代码存储',
  ScheduleUpdated: '费用表更新',
  Dispatched: '分发调用',
  Contract: '合约运行日志',
  Change: '变更',
  instantiate: '实例合约',
  DepositorReward: '跨链奖励',
  BitcoinBinding: '比特币绑定',
  unnominate: '撤销投票',
  sudo: 'sudo',
  set_block_producer: '设置出块人',
  pushHeader: '提交块头',
  finalHint: '确认提示',
  claim: '提息',
  renominate: '切换投票',
  set: '设置',
  setup_trustee: '信托设置',
  withdraw: '提现',
  nominate: '投票',
  create_withdraw_tx: '申请提现',
  sign_withdraw_tx: '响应提现',
  cancel_order: '撤单',
  register: '注册节点',
  put_order: '挂单',
  unfreeze: '解冻',
  push_transaction: '提交交易',
  put_transaction: '提交交易',
  transfer: '转账',
  refresh: '更新节点',
  Claimed: '领取SDOT',
  Sudid: '已设置',
  Deposit: '充值',
  WithdrawalFinish: '提现结束',
  Unfreeze: '撤回解冻',
  DepositorClaim: '充值提息',
  Move: '转移资产',
  Destory: '销毁资产',
  Unnominate: '撤票',
  WithdrawalFatalErr: '提现错误',
  NewAuthorities: '新验证人',
  ExtrinsicSuccess: '交易成功',
  FillOrder: '成交订单',
  NewTrustees: '更新信托节点',
  MissedBlocksOfOfflineValidatorPerSession: '每个 session 掉线节点及漏块数',
  Refresh: '更新节点信息',
  Rotation: '验证人轮换',
  Withdrawal: '提现',
  InsertTx: '新增交易',
  Nominate: '注册节点',
  NewAccountIndex: '新建账户索引',
  UpdateOrderPair: '更新交易对',
  CreateWithdrawalProposal: '构造提现交易',
  NewAccount: '创建新账户',
  ExtrinsicFailed: '交易失败',
  UpdateSignWithdrawTx: '更新信托节点签名状态',
  Reward: '分红周期分发奖励',
  Claim: '提息',
  UpdateOrder: '更新订单',
  Issue: '发行资产',
  InsertHeader: '新增块头',
  WithdrawalApply: '提现申请',
  putOrder: '挂单',
  NewSession: '新会话已开始',
  FeeForJackpot: '奖池手续费',
  FeeForProducer: '验证人手续费',
  FeeForCouncil: '议会手续费',
  deploy: '部署',
  execute: '执行',
  confirm: '确认',
  is_owner_for: '判断拥有者',
  remove_multi_sig_for: '删除多签',
  transition_trustee_session: '信托换届',
  DeployMultiSig: '部署多签',
  ExecMultiSig: '执行多签',
  Confirm: '确认多签',
  RemoveMultiSigIdFor: '移除多签',
  SetDeployFee: '设置部署手续费',
  SetExecFee: '设置执行手续费',
  SetConfirmFee: '设置确认手续费',
  SetBitcoinTrusteeProps: '设置比特币信托',
  BitcoinNewTrustees: '比特币信托换届',
  setup_bitcoin_trustee: '设置比特币信托',
  transition_trustee_session_by_root: '信托换届(root)',
  set_trustee_info_config: '设置信托配置',
  SignWithdrawalProposal: '签署提现提议',
  DropWithdrawalProposal: '删除提现提议',
  revoke_withdraw: '撤销提现',
  Lock: '锁仓LBTC',
  Unlock: '解锁LBTC',
  UnlockedFromRoot: '议会解锁LBTC',
  ChannelBinding: '渠道绑定',
  Minted: '铸币',
  Slashed: '清除',
  Offence: '犯规',
  bond: '抵押',
  unbond: '解除抵押',
  vote: '投票',
  heartbeat: '心跳',
  second: '支持议案',
  propose: '提出议案',
  transferKeepAlive: '转账',
  setKeys: '设置会话密钥',
  purgeKeys: '移除会话密钥',
  HeartbeatReceived: '心跳已接收',
  AllGood: '正常运行',
  batch: '批处理成功',
  validate: '验证'
}

export const callEnNameMap = {
  convert_to_xrc20: 'convert to xrc20',
  update_schedule: 'update schedule',
  put_code: 'put code',
  call: 'call',
  Transfer: 'transfer',
  Instantiated: 'instantiated',
  CodeStored: 'codeStored',
  ScheduleUpdated: 'schedule updated',
  Dispatched: 'dispatched',
  Contract: 'contract log',
  Change: 'change',
  instantiate: 'instantiate contract',
  DepositorReward: 'Cross Chain Reward',
  BitcoinBinding: 'Bitcoin Binding',
  unnominate: 'Unnominate',
  sudo: 'sudo',
  set_block_producer: 'Set Block Author',
  pushHeader: 'Submit Header',
  finalHint: 'Final Hint',
  claim: 'Claim',
  renominate: 'Renominate',
  set: 'Setup',
  setup_trustee: 'Setup Trustee',
  withdraw: 'Withdrawal',
  nominate: 'Nominate',
  create_withdraw_tx: 'Create Withdrawal',
  sign_withdraw_tx: 'Respond Withdrawal',
  cancel_order: 'Cancel Order',
  register: 'Register Intention',
  put_order: 'Place Orde',
  unfreeze: 'Unfreeze',
  push_transaction: 'Submit BTC Tx',
  put_transaction: 'Submit BTC Tx',
  transfer: 'Transfer',
  refresh: 'Update Intention Info',
  Claimed: 'Claim S-DOT',
  Sudid: 'Sudid',
  Deposit: 'Deposit',
  WithdrawalFinish: 'Finish Withdrawal',
  Unfreeze: 'Unfreeze Staking Revocation Reserved',
  DepositorClaim: 'Depositor Claim',
  Move: 'Move Asset',
  Destory: 'Destory Asset',
  Unnominate: 'Unnominate',
  HeaderInserted: '头部插入',
  WithdrawalFatalErr: 'Fatal Withdrawal Error',
  NewAuthorities: '新验证人',
  DeployMultiSig: 'Deploy Multisig',
  ExtrinsicSuccess: 'Extrinsic Success',
  FillOrder: 'Fill Order',
  NewTrustees: 'New Trustee Set',
  MissedBlocksOfOfflineValidatorPerSession: 'Missed Blocks Info Per Session',
  Refresh: 'Update Intention Info',
  Rotation: 'New Validator Set',
  Withdrawal: 'Withdrawal',
  Endowed: 'Endowed', // Donate
  InsertTx: 'New Tx',
  Nominate: 'Register Intention',
  NewAccountIndex: 'New Account Index',
  UpdateOrderPair: 'Update Trading Pair',
  CreateWithdrawalProposal: 'Create Withdrawal Proposal',
  NewAccount: 'NewAccount',
  ExtrinsicFailed: 'Extrinsic Failed',
  UpdateSignWithdrawTx: 'Update Trustee Sign Status',
  Reward: 'Session Reward',
  Claim: 'Claim',
  UpdateOrder: 'Update Order',
  Issue: 'Issue',
  InsertHeader: 'New Header',
  WithdrawalApply: 'Withdrawal Application',
  putOrder: 'Put Order',
  NewSession: 'New Session',
  FeeForJackpot: 'Jackpot Fee',
  FeeForProducer: 'Producer Fee',
  FeeForCouncil: 'Council Fee',
  deploy: 'Deploy',
  execute: 'Execute',
  confirm: 'Confirm',
  is_owner_for: 'Check MultiSig Owner',
  remove_multi_sig_for: 'Remove MultiSig',
  transition_trustee_session: 'New Trustee Set',
  ExecMultiSig: 'Execute MultiSig',
  Confirm: 'Confirm MultiSig',
  RemoveMultiSigIdFor: 'Remove MultiSig',
  SetDeployFee: 'Set Deploy Fee',
  SetExecFee: 'Set Execution Fee',
  SetConfirmFee: 'Set Confirmation Fee',
  SetBitcoinTrusteeProps: 'New Bitcoin Trustee Set',
  BitcoinNewTrustees: 'New Bitcoin Trustee Set',
  setup_bitcoin_trustee: 'Setup Bitcoin Trustee',
  transition_trustee_session_by_root: 'New Trustee Set via Root',
  set_trustee_info_config: 'Set Trustee Info',
  SignWithdrawalProposal: 'Sign Withdrawal Proposal',
  DropWithdrawalProposal: 'Drop Withdrawal Proposal',
  revoke_withdraw: 'cancel withdraw',
  Lock: 'Lock LBTC',
  Unlock: 'Unlock LBTC',
  UnlockedFromRoot: 'Council Unlock LBTC',
  ChannelBinding: 'Channel Binding',
  Minted: 'Minted',
  Slashed: 'Slashed',
  Offence: 'Offence',
  bond: 'Bond',
  unbond: 'Unbond',
  vote: 'Vote',
  heartbeat: 'HeartBeat',
  second: 'Second',
  propose: 'Propose',
  transferKeepAlive: 'Transfer',
  setKeys: 'Set Keys',
  purgeKeys: 'Purge Keys',
  HeartbeatReceived: 'Heartbeat Received',
  TransactionFeePaid: 'Transaction Fee Paid',
  FeePaid: 'Fee Paid',
  xTransactionFee: 'Transaction Fee',
  AllGood: 'All Good',
  batch: 'Batch Processed',
  validate: 'Validate'
}

const callNameMap = Object.entries(callEnNameMap).reduce(
  (result, [key, value]) => {
    const zhValue = callZhNameMap[key] || value

    return {
      ...result,
      [key]: {
        zh: zhValue,
        en: value
      }
    }
  },
  {}
)

export default {
  ...moduleNameMap,
  ...callNameMap
}
