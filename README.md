# MEAN-revamped-stack
Revamped-Stack JavaScript Using MongoDB, Express, AngularJS, and Node.js<br/>
### Prerequisites
<p> nodejs & the latest version of npm which must be installed globally</p>
### Start project 
<p><pre><code>npm start //this will download all the important dependencies</code></pre></p>
<p>By default server will start on port 3000 in development, Stack supports 3 types of environment & can be easily changed</p>
<table>
<tr>
<th>Env</th>
<th>Port</th>
</tr>
<tbody>
<tr>
<td>development(default)</td>
<td>3000</td>
</tr>
<tr>
<td>staging</td>
<td>5000</td>
</tr>
<tr>
<td>production</td>
<td>8000</td>
</tr>
</tbody></table>
>_Above settings can easily be changed from_ `/server/conf/server.config.js`

<p>In case of starting the server in different env, first set the global environment variable of OS</p>
<pre><code>//Windows user 
set NODE_ENV=production

//Linux user 
$ export NODE_ENV=production

//Note: If no environment variable is defined then
//by default server will starts in "development" mode
</code></pre>



<p>And run <pre><code>npm start</code></pre></p>


<h3>Project directory structure</h3>


<pre>
<code>
.
+--- client
|    +--- views
|    |    +---app
|    |    |	  ---app.js
|    |    ---index.jade
|    |    ---error.jade
|    |    ---layout.jade
|    +--- public
|    |    +---assets
|    |    |		+---css
|    |    |		+---images
|    |    |		+---js
|    |    +---bower_components
+--- server
|    +--- conf
|    |	   | ---db.config.js
|    |	   | ---server.config.js
|    |	   | ---karma.config.js
|    |	   | ---express.config.js
|    |	   | ---roles.config.js
|	 +---  controllers
|	 +---  schema
|	 +---  services
|	 +---  models
|	 +---  routes
|	 |	   ---server.js
|--- .gitignore
|--- .bowerrc
|--- package.json
|--- bower.json
|--- README.md
|--- LICENSE
|--- server.js
|--- travis.yml
|--- Gruntfile.js

</code>
</pre>
