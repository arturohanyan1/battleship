const setShotSVGClasses = (item) => {
  if (!item.hasShipPart && !['injured', 'crashed'].includes(item.shipStatus)) {
    return 'shoted-shot'
  }
  if (item.hasShipPart && item.shipStatus === 'injured') {
    return 'injured-shot'
  }
  if (item.hasShipPart && item.shipStatus === 'crashed') {
    return 'crashed-shot'
  }
}

export default setShotSVGClasses;