export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW",
      },
    },
    
    // {
    //   name: "Khách sạn",
    //   url: "/hotel",
    //   icon: "icon-speedometer",
    //   children:[
    //     {
    //       name: ' Khách sạn ',
    //       url: '/hotel',
    //       icon: 'icon-puzzle',
    //     },

    //    { name: ' Vị trí',
    //     url: '/location',
    //     icon: 'icon-puzzle'
    //   }
    //   ]

    // },
    // {
    //   name: "DanhMuc",
    //   url: "/base/tables",
    //   icon: "icon-speedometer",
    //   badge: {
    //     variant: "info",
    //     text: "NEW",
    //   },    
    // },
    // {
    //   title: true,
    //   name: 'Theme',
    //   wrapper: {            // optional wrapper object
    //     element: '',        // required valid HTML5 element tag
    //     attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: ''             // optional class names space delimited list for title item ex: "text-center"
    // },
    // {
    //   name: 'Colors',
    //   url: '/theme/colors',
    //   icon: 'icon-drop',
    // },
    // {
    //   name: 'Typography',
    //   url: '/theme/typography',
    //   icon: 'icon-pencil',
    // },
    // {
    //   title: true,
    //   name: 'Components',
    //   wrapper: {
    //     element: '',
    //     attributes: {},
    //   },
    // },
     {
       name:'Dịch vụ',
       url:'/base',
      icon: 'icon-puzzle',
      children:[
        {
          name: 'Dịch vụ ',
          url: '/chart/service',
          icon: 'icon-cursor',
        },
        {
          name:"Quyền",
          url:'/chart/role',
          icon: 'icon-cursor',
        },
        {
          name:"Chức vụ",
          url:'/chart/position',
          icon: 'icon-cursor',
        }
      ]



     },
    {
      name: 'Khách hàng',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        // {
        //   name: 'Breadcrumbs',
        //   url: '/base/breadcrumbs',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Cards',
        //   url: '/base/cards',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Carousels',
        //   url: '/base/carousels',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Dropdowns',
        //   url: '/base/dropdowns',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Forms',
        //   url: '/base/forms',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'AddCustomer',
        //   url: '/base/addcustomer',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Jumbotrons',
        //   url: '/base/jumbotrons',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'List groups',
        //   url: '/base/list-groups',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Navs',
        //   url: '/base/navs',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Paginations',
        //   url: '/base/paginations',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Popovers',
        //   url: '/base/popovers',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Progress Bar',
        //   url: '/base/progress-bar',
        //   icon: 'icon-puzzle',
        // },
        {
          name: 'Đặt phòng',
          url: '/base/registerroom',
          icon: 'icon-puzzle',
        },
        {
          name: 'Khách hàng',
          url: '/base/tables',
          icon: 'icon-puzzle',
        },
        // {
        //   name: 'AddCustomer',
        //   url: '/base/tables/addcustomer',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Tabs',
        //   url: '/base/tabs',
        //   icon: 'icon-puzzle',
        // },
        // {
        //   name: 'Tooltips',
        //   url: '/base/tooltips',
        //   icon: 'icon-puzzle',
        // },
      ],
    },
    {
      name: 'Khách sạn',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        // {
        //   name: 'Buttons',
        //   url: '/buttons/buttons',
        //   icon: 'icon-cursor',
        // },
        // {
        //   name: 'Button dropdowns',
        //   url: '/buttons/button-dropdowns',
        //   icon: 'icon-cursor',
        // },
        {
          name: 'Khách sạn ',
          url: '/buttons/hotel',
          icon: 'icon-cursor',
        },
        // {
        //   name: 'Button groups',
        //   url: '/buttons/button-groups',
        //   icon: 'icon-cursor',
        // },
        // {
        //   name: 'Brand Buttons',
        //   url: '/buttons/brand-buttons',
        //   icon: 'icon-cursor',
        // },
      ],
    },
    // {
    //   name: 'Charts',
    //   url: '/charts',
    //   icon: 'icon-pie-chart',
    // },
    {
      name: 'Nhân Viên',
      url: '/icons',
      icon: 'icon-star',
      children: [
        // {
        //   name: 'CoreUI Icons',
        //   url: '/icons/coreui-icons',
        //   icon: 'icon-star',
        //   badge: {
        //     variant: 'info',
        //     text: 'NEW',
        //   },
        // },
        {
          name: 'Nhân Viên',
          url: '/employer',
          icon: 'icon-star',
        },
        // {
        //   name: 'Font Awesome',
        //   url: '/icons/font-awesome',
        //   icon: 'icon-star',
        //   badge: {
        //     variant: 'secondary',
        //     text: '4.7',
        //   },
        // },
        // {
        //   name: 'Simple Line Icons',
        //   url: '/icons/simple-line-icons',
        //   icon: 'icon-star',
        // },
      ],
    },
  //   {
  //     name: 'Notifications',
  //     url: '/notifications',
  //     icon: 'icon-bell',
  //     children: [
  //       {
  //         name: 'Alerts',
  //         url: '/notifications/alerts',
  //         icon: 'icon-bell',
  //       },
  //       {
  //         name: 'Badges',
  //         url: '/notifications/badges',
  //         icon: 'icon-bell',
  //       },
  //       {
  //         name: 'Modals',
  //         url: '/notifications/modals',
  //         icon: 'icon-bell',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Widgets',
  //     url: '/widgets',
  //     icon: 'icon-calculator',
  //     badge: {
  //       variant: 'info',
  //       text: 'NEW',
  //     },
  //   },
  //   {
  //     divider: true,
  //   },
  //   {
  //     title: true,
  //     name: 'Extras',
  //   },
    // {
    //   name: "Pages",
    //   url: "/pages",
    //   icon: "icon-star",
    //   children: [
    //     {
    //       name: "Login",
    //       url: "/login",
    //       icon: "icon-star",
    //     },
    //     {
    //       name: "Register",
    //       url: "/register",
    //       icon: "icon-star",
    //     },
    //     {
    //       name: "Error 404",
    //       url: "/404",
    //       icon: "icon-star",
    //     },
    //     {
    //       name: "Error 500",
    //       url: "/500",
    //       icon: "icon-star",
    //     },
    //   ],
    // },
  //   {
  //     name: "Disabled",
  //     url: "/dashboard",
  //     icon: "icon-ban",
  //     attributes: { disabled: true },
  //   },
  //   {
  //     name: "Download CoreUI",
  //     url: "https://coreui.io/react/",
  //     icon: "icon-cloud-download",
  //     class: "mt-auto",
  //     variant: "success",
  //     attributes: { target: "_blank", rel: "noopener" },
  //   },
  //   {
  //     name: "Try CoreUI PRO",
  //     url: "https://coreui.io/pro/react/",
  //     icon: "icon-layers",
  //     variant: "danger",
  //     attributes: { target: "_blank", rel: "noopener" },
  //   },
  ],
};
