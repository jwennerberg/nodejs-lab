node ("nodejs") {

  def ocp_namespace = "dg"
  def redis_name = "redis-dg"

//  env.GET_CFG_FROM = "env"
//  env.REDIS_HOST = "${redis_name}"

  stage "Clone"
  git url: "http://github.com/jwennerberg/nodejs-lab.git"

  stage "Deploy redis"
  sh "oc project ${ocp_namespace}"
  sh "oc new-app --template=redis -p REDIS_SERVICE_NAME=${redis_name}"
  openshiftVerifyService(serviceName: "${redis_name}", namespace: "${ocp_namespace}")

  stage "Test"
  sh "npm test"

  stage "Destroy redis"
  openshiftDeleteResourceByKey(types: "svc,dc,is", key: "${redis_name}", namespace: "${ocp_namespace}")

/*
  stage "Build"
  sh "npm install"

  stage "Build Image"
  sh "oc project s2i"
  sh "oc start-build nodejs-lab --follow --wait"
*/
}
