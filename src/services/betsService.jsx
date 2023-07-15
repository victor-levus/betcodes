import http from "./httpService";

const apiBets = http.getApiEndPoint() + "/betcodes/bets";
const apiBookCodeInfo = http.getApiEndPoint() + "/betcodes/bookcodeinfo";

function betUrl(id) {
  return `${apiBets}/${id}`;
}

export function getBets() {
  return http.get(apiBets);
}

export function getBookCodeInfo() {
  return http.get(apiBookCodeInfo);
}

export function getBet(betId) {
  return http.get(betUrl(betId));
}

export function deleteBet(betId) {
  return http.delete(betUrl(betId));
}

export function saveBet(bet) {
  if (bet._id) {
    const body = { ...bet };
    delete body._id;
    return http.put(betUrl(bet._id), body);
  }

  return http.post(apiBets, bet);
}
