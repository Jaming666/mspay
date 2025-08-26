const CodeUtil = {
  accountType: type => {
    switch (type) {
      case '01':
        return '对公';
      case '00':
        return '对私';
      default:
        return type;
    }
  },
  tranType: type => {
    switch (type) {
      case 'ADD':
        return '收入';
      case 'SUB':
        return '支出';
      default:
        return type;
    }
  }
}

export default CodeUtil