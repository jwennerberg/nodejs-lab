node ("nodejs") {

  stage "Clone"
  git url: "http://github.com/jwennerberg/nodejs-lab.git"

  stage "Test"
  sh "npm test"

  stage "Build"
  sh "npm install"

  stage "Build Image"
  sh "oc project s2i"
  sh "oc start-build nodejs-lab --follow --wait"

}
