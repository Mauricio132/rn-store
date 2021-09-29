import AsyncStorage from "@react-native-async-storage/async-storage";
import { size } from "lodash";
import { environment } from "../../environments/environment";

const SEARCH_HISTORY = environment.searchHistory;

export async function getSearchHistory() {
  try {
    const history = await AsyncStorage.getItem(SEARCH_HISTORY);
    if (!history) return [];

    return sortArrayByDate(JSON.parse(history));
  } catch (e) {
    return [];
  }
}

export async function updateSearchHistory(search) {
  const history = await getSearchHistory();

  if (size(history) > 6) history.pop();

  history.push({
    search,
    date: new Date(),
  });

  await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
}

//ordena los elementos por fechaç
function sortArrayByDate(array) {
  return array.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
}
