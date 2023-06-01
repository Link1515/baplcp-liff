export const createJoinMessage = (params: {
  name: string
  date: string
  timeStart: string
  timeEnd: string
  price: number
  joinLimit: number
  joinUrl: string
}) => {
  const { name, date, timeStart, timeEnd, price, joinLimit, joinUrl } = params

  return {
    type: 'flex',
    altText: `${name} ${date} 報名開始`,
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
            text: `${name}`,
            weight: 'bold',
            size: 'xl',
            color: '#334155',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '日期',
                    color: '#aaaaaa',
                    flex: 1,
                    size: 'xs',
                  },
                  {
                    type: 'text',
                    text: `${date}`,
                    wrap: true,
                    color: '#334155',
                    size: 'sm',
                    flex: 5,
                  },
                ],
              },
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '時間',
                    color: '#aaaaaa',
                    size: 'sm',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: `${timeStart} ~ ${timeEnd}`,
                    wrap: true,
                    color: '#334155',
                    size: 'sm',
                    flex: 5,
                  },
                ],
              },
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '費用',
                    color: '#aaaaaa',
                    size: 'sm',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: `${price} 元`,
                    wrap: true,
                    color: '#334155',
                    size: 'sm',
                    flex: 5,
                  },
                ],
              },
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '人數',
                    color: '#aaaaaa',
                    size: 'sm',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: `${joinLimit} 人`,
                    wrap: true,
                    color: '#334155',
                    size: 'sm',
                    flex: 5,
                  },
                ],
              },
            ],
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
              label: '立即報名',
              uri: `${joinUrl}`,
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
