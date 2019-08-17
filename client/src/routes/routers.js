
import App from '../App';

import Layouts from '../container/Layout/Layouts';
import Test from '../container/Test/test';
import Articlelist from '../container/Articlelist/Articlelist'

export default  [
  {
    component: App,
    routes: [
      // {
      //   path: "/login",
      //   exact: true,
      //   component: Login,
      // },

      {
          path: "/",
          component: Layouts,
          routes: [
            {
              path: "/",
              exact: true,
              component: Articlelist,
            },
            // {
            //   path: "/content",
            //   exact: true,
            //   component: Test,
            // },
          ]
      },

    ]
  }

  ];
