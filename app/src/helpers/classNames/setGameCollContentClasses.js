const setGameCollContentClasses = (item) => {
  if (item.shoted && !item.hasShipPart && !['injured', 'crashed'].includes(item.shipStatus)) {
    return 'shoted'
  }
  if (item.shoted && item.hasShipPart && item.shipStatus === 'injured') {
    return 'injured'
  }
  if (item.shoted && item.hasShipPart && item.shipStatus === 'crashed') {
    return 'crashed'
  }
  if (item.shipStatus === 'disabled') {
    return 'disabled'
  }
};

export default setGameCollContentClasses;