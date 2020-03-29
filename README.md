## React / Redux in conjunction with the API

Hey, let's build simple Blog.
We will start with simple MVP. It will have Posts and Comments features.
Use React as view framework. JavaScript has to be ES 6+.
State layer should be handled with Redux.
Use React Router to manage routing.

### Pages and Features
#### Our blog going to have next pages:
*	Latest Posts / -- List of all Posts, Post short description.
*	View Post /posts/:postId -- Post page
#### Features:
*	View list of latest Posts
*	View specific Post
*	Create new comment under Post
*	Create / Edit Post * Optional

### API
To persist data and work with real API, we're going to use simple Node.js. API hosted in cloud and you can query it from anywhere. API endpoints documentation: https://documenter.getpostman.com/view/8417459/SzS1Tp1m?version=latest

### Structure and Code Style
*	Split components to Presentational and Container components
*	Redux action, reducers, and selectors should be separate from each other. To handle network you can use native browser fetch method and redux-thunk middleware. As another option we prefer is Axios.
*	ES 6/7 features are very welcome. If you want to use async / await etc. go ahead and do it.

### Design
The design is up to you. Simple, minimalistic and clean would be nice. 

### Conditions
*	Avoid use of jQuery and bootstrap. Native JS and flexbox nowadays solve all you need from these two.
*	Task usually takes from 2 to 4 hours. If you need more time, you're good to take it and it's appreciated, but results should be sent no later than 24 hours after the start.
*	Challenge code should be uploaded git repository to GitHub. Send us link to the repository right after that. Thanks!
*	Skills to write great business logic evaluated higher than markup or styling.

If you have any questions about challenge details, ask for details, it's appreciated.
Have a good luck and looking forward to working with you!