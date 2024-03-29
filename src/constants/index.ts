export const sidebarMenuLinks = [
  {
    imgUrl: "/assets/icons/home.svg",
    route: "/",
    label: "홈",
  },
  {
    imgUrl: "/assets/icons/explore.svg",
    route: "/explore",
    label: "둘러보기",
  },
  {
    imgUrl: "/assets/icons/search.svg",
    route: "/search",
    label: "검색하기",
  },
]

export const sidebarPrivateLinks = [
  {
    imgUrl: "/assets/icons/like.svg",
    route: "/like-list",
    label: "좋아요",
  },
  {
    imgUrl: "/assets/icons/playlist.svg",
    route: "/playlist",
    label: "플레이리스트",
  },
  {
    imgUrl: "/assets/icons/profile.svg",
    route: "/profile",
    label: "프로필",
  },
]

export const bottomLinks = [
  {
    imgUrl: "/assets/icons/home.svg",
    route: "/",
    label: "홈",
  },
  {
    imgUrl: "/assets/icons/chart.svg",
    route: "/chart",
    label: "뮤직 차트",
  },
  {
    imgUrl: "/assets/icons/liked.svg",
    route: "/like-list",
    label: "좋아요",
  },
  {
    imgUrl: "/assets/icons/playlist.svg",
    route: "/playlist",
    label: "플레이리스트",
  },
  {
    imgUrl: "/assets/icons/profile.svg",
    route: "/profile",
    label: "프로필",
  },
]


export const profileSliderMenuLinks = [
  {
    imageUrl: '',
    title: '최근 재생',
    description: '최근 재생된 곡 총 14개',
    color: 'bg-gradient-to-r from-green-500 to-blue-500',
    icon: '/assets/icons/profileIcon01.svg'
  },
  {
    imageUrl: '',
    title: '좋아요',
    description: '좋아요한 곡 총 16개',
    color: 'bg-gradient-to-r from-pink-500 to-orange-500',
    icon: '/assets/icons/profileIcon02.svg'

  },
  {
    imageUrl: '',
    title: '플레이리스트',
    description: '플레이리스트에 담은 곡 총 28개',
    color: 'bg-gradient-to-r from-blue-500 to-purple-500',
    icon: '/assets/icons/profileIcon03.svg'

  },
  {
    imageUrl: '',
    title: 'AI 추천곡',
    description: '자주 듣는 태그를 기반으로 AI가 추천하는 곡이 77개 있습니다.',
    color: 'bg-gradient-to-r from-lime-500 to-yellow-500',
    icon: '/assets/icons/profileIcon04.svg'

  },
  {
    imageUrl: '',
    title: '신곡 둘러보기',
    description: '2024-1-24일 새롭게 추가된 곡이 70개 있습니다.',
    color: 'bg-gradient-to-r from-cyan-500 to-lime-500',
    icon: '/assets/icons/profileIcon05.svg'
  }
]


// contentRecommendations.map의 content를 하위 컴포넌트에 주고 하위 컴포넌트에서 다시 content.map으로 이미지 뿌리기
export const contentRecommendations = [
  [
    {
      bgColor: 'bg-gradient-to-r from-blue-500 to-purple-500',
      title: 'Favorites',
      subText: '좋아요한 곡 총 16개',
      link: '/like-list'
    },
    {
      contentImg: '/assets/coverArt/coverArt06.jpg',
      link: '/song/detail/65afb7f9408edd2bf570'
    },
    {
      contentImg: '/assets/coverArt/coverArt03.jpg',
      link: '/song/detail/65afb8ef8f548c67f458'
    },
    {
      contentImg: '/assets/coverArt/coverArt02.jpg',
      link: '/song/detail/65afb95d980e62c1bc14'
    },
    {
      contentImg: '/assets/coverArt/coverArt01.jpg',
      link: '/song/detail/65afb9c95406d0b614a3'
    },
    {
      contentImg: '/assets/coverArt/coverArt04.jpg',
      link: '/song/detail/65afb87d738116a5a185'
    },
    {
      contentImg: '/assets/coverArt/coverArt05.jpg',
      link: '/song/detail/65afb84d34ea4704e409'
    },
    {
      contentImg: '/assets/coverArt/coverArt07.jpg',
      link: '/song/detail/65afb799abbd24b3f4a7'
    },
    {
      contentImg: '/assets/coverArt/coverArt08.jpeg',
      link: '/song/detail/65afb764d8a185e208df'
    },
  ],
  [
    {
      bgColor: 'bg-gradient-to-r from-cyan-500 to-lime-500',
      title: 'Playlist',
      subText: '플레이리스트에 담은 곡 총 28개',
      link: '/playlist'
    },
    {
      contentImg: '/assets/coverArt/coverArt05.jpg',
      link: '/song/detail/65afb84d34ea4704e409'
    },
    {
      contentImg: '/assets/coverArt/coverArt02.jpg',
      link: '/song/detail/65afb95d980e62c1bc14'
    },
    {
      contentImg: '/assets/coverArt/coverArt04.jpg',
      link: '/song/detail/65afb87d738116a5a185'
    },
    {
      contentImg: '/assets/coverArt/coverArt03.jpg',
      link: '/song/detail/65afb8ef8f548c67f458'
    },
    {
      contentImg: '/assets/coverArt/coverArt06.jpg',
      link: '/song/detail/65afb7f9408edd2bf570'
    },
    {
      contentImg: '/assets/coverArt/coverArt08.jpeg',
      link: '/song/detail/65afb764d8a185e208df'
    },
    {
      contentImg: '/assets/coverArt/coverArt07.jpg',
      link: '/song/detail/65afb799abbd24b3f4a7'
    },
    {
      contentImg: '/assets/coverArt/coverArt01.jpg',
      link: '/song/detail/65afb9c95406d0b614a3'
    },
  ],
  [
    {
      bgColor: 'bg-gradient-to-r from-pink-500 to-orange-500',
      title: 'Recently',
      subText: '최근 재생된 곡 총 14개',
      link: '/list-recently-played'
    },
    {
      contentImg: '/assets/coverArt/coverArt01.jpg',
      link: '/song/detail/65afb9c95406d0b614a3'
    },
    {
      contentImg: '/assets/coverArt/coverArt06.jpg',
      link: '/song/detail/65afb7f9408edd2bf570'
    },
    {
      contentImg: '/assets/coverArt/coverArt02.jpg',
      link: '/song/detail/65afb95d980e62c1bc14'
    },
    {
      contentImg: '/assets/coverArt/coverArt05.jpg',
      link: '/song/detail/65afb84d34ea4704e409'
    },
    {
      contentImg: '/assets/coverArt/coverArt03.jpg',
      link: '/song/detail/65afb8ef8f548c67f458'
    },
    {
      contentImg: '/assets/coverArt/coverArt07.jpg',
      link: '/song/detail/65afb799abbd24b3f4a7'
    },
    {
      contentImg: '/assets/coverArt/coverArt04.jpg',
      link: '/song/detail/65afb87d738116a5a185'
    },
    {
      contentImg: '/assets/coverArt/coverArt08.jpeg',
      link: '/song/detail/65afb764d8a185e208df'
    },
  ]
]