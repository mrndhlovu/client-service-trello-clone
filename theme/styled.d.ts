import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      amazon: string
      android: string
      behance: string
      bgBody: string
      bgDark: string
      bitbucket: string
      blogger: string
      body: string
      border: string
      cc: string
      ccStripe: string
      delicious: string
      digg: string
      dribbble: string
      dropbox: string
      drupal: string
      facebook: string
      flattr: string
      flickr: string
      foursquare: string
      getPocket: string
      github: string
      google: string
      googlePlus: string
      heading: string
      instagram: string
      lightBgBody: string
      lightBgDark: string
      lightBody: string
      lightBorder: string
      lightHeading: string
      lightSecondary: string
      lightTheme: string
      line: string
      linkedin: string
      medium: string
      messenger: string
      openid: string
      paypal: string
      pinterest: string
      podcast: string
      primary: string
      quora: string
      reddit: string
      rss: string
      scribd: string
      secondary: string
      skype: string
      slack: string
      slideshare: string
      snapchat: string
      soundcloud: string
      spotify: string
      steam: string
      stumbleupon: string
      tumblr: string
      trello: string
      twitter: string
      vimeo: string
      vine: string
      vk: string
      wechat: string
      weibo: string
      whatsapp: string
      wikipedia: string
      wordpress: string
      xing: string
      yahoo: string
      yelp: string
      youtube: string
    }
    fonts: {
      primary: string
      secondary: string
    }
    styles: {
      light: FlattenInterpolation<ThemeProps<DefaultTheme>>
      reset: FlattenInterpolation<ThemeProps<DefaultTheme>>
      typography: FlattenInterpolation<ThemeProps<DefaultTheme>>
      utilities: FlattenInterpolation<ThemeProps<DefaultTheme>>
      absoluteCenter: FlattenInterpolation<ThemeProps<DefaultTheme>>
    }
    keyframes: {
      fadeInDown: Interpolation<ThemeProps<DefaultTheme>>
      fadeInLeft: Interpolation<ThemeProps<DefaultTheme>>
      fadeInRight: Interpolation<ThemeProps<DefaultTheme>>
      fadeInUp: Interpolation<ThemeProps<DefaultTheme>>
      slideInStar: Interpolation<ThemeProps<DefaultTheme>>
    }
    device: {
      desktop: string
      desktopXs: string
      laptop: string
      mobileLg: string
      mobileSm: string
      mobileXs: string
      notebook: string
      tablet: string
    }
    variables: {
      body: string
      transition: string
    }
    mixins: {
      clearFix: () => Interpolation<ThemeProps<DefaultTheme>>
      flex: (
        direction?: string,
        justify?: string,
        align?: string
      ) => Interpolation<ThemeProps<DefaultTheme>>
      flexGap: (gap: string) => Interpolation<ThemeProps<DefaultTheme>>
      gradientBg: (
        value: string,
        deg: number
      ) => Interpolation<ThemeProps<DefaultTheme>>
      gradientColor: (
        value: string,
        deg: number
      ) => Interpolation<ThemeProps<DefaultTheme>>
      grid: (
        placement?: string,
        align?: string
      ) => Interpolation<ThemeProps<DefaultTheme>>
      lineClamp: (
        numberOfLines: number
      ) => Interpolation<ThemeProps<DefaultTheme>>
      placeholderColor: (
        placeholderColor: string
      ) => Interpolation<ThemeProps<DefaultTheme>>
      textHoverEffect: (
        color?: string
      ) => Interpolation<ThemeProps<DefaultTheme>>
      transitionEffect: (
        property?: string
      ) => Interpolation<ThemeProps<DefaultTheme>>
    }
  }
}
