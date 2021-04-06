function isTransferExtrinsic(section, methodName) {
  return (
    (section === 'balances' && methodName === 'transfer')
  )
}

module.exports = {
  isTransferExtrinsic
}
