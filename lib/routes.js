FlowRouter.route '/',
  name: 'home',
  action: ->
    BlazeLayout.render 'MainLayout',
      content: 'home',
      nav: 'navigationList'
