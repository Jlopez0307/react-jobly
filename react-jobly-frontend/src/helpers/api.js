import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "postgresql://xvvfgpmw:C7eg6Mc-_yMqSx1g3EtvVY4w6xG82ebG@mahmud.db.elephantsql.com/xvvfgpmw";
// BASE_URL was localhost://3001
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  };

  static async searchCompany(query) {
    let res = await this.request(`companies/?name=${query}`);
    return res;
  };



  // obviously, you'll add a lot here ...

  /** Get details on all companies */
  static async getAllCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  };

  /**Gets details on all jobs */
  static async getAllJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  };

  /**Gets details on a job based on id */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res;
  };

  static async searchJob(query){
    let res = await this.request(`jobs/?title=${query}`)
    return res;
  }

  //Login a user
  static async login(username, password){
    const res = await JoblyApi.request("auth/token", {username: username, password: password}, "post");
    return res;
  };

  //Gets user based on username
  static async getUser(username){
    let res = await this.request(`users/${username}`);
    return res;
  };

  //Updates a user based on username
  static async updateUser(username, data, method){
    let res = await this.request(`users/${username}`, data, method);
    return res;
  };

  static async userJobApplication( username, jobId ) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, undefined, "post");
    return res;
  };


};

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;