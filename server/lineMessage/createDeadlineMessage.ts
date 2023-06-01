export const createDeadlineMessage = (params: {
  name: string
  date: string
  url: string
}) => {
  const { name, date, url } = params

  return {
    type: 'flex',
    altText: `${name} ${date} 報名截止`,
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'BAPLCP',
            size: '3xl',
            align: 'center',
            weight: 'bold',
            color: '#ffffff',
          },
          {
            type: 'text',
            text: '活動報名系統',
            color: '#ffffff',
            align: 'center',
          },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `${name} 報名截止!`,
            weight: 'bold',
            size: 'xl',
            color: '#334155',
          },
          {
            type: 'text',
            text: '立即查看本次報名結果',
            color: '#aaaaaa',
            flex: 1,
            size: 'md',
            margin: 'md',
          },
        ],
        paddingBottom: 'xxl',
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'primary',
            height: 'sm',
            action: {
              type: 'uri',
              label: '立即查看',
              uri: `${url}`,
            },
            color: '#5768FF',
          },
        ],
        flex: 0,
      },
      styles: {
        header: {
          backgroundColor: '#002c5d',
        },
      },
    },
  }
}
