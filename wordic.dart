class Word {
  String term;
  dynamic def;
  Word({required this.term, required this.def});
}

abstract class Dictionary {
  Dictionary();

  void add(Word word);
  dynamic get(String term);
  void delete(String term);
  void update(String term, dynamic def);
  List<String> showAll();
  int count();
  void upsert(Word word);
  bool exists(String term);
  void bulkAdd(List<Word> wordArr);
  void bulkDelete(List<String> defArr);
}

typedef Words = Map<String, dynamic>;

class SimpleDic extends Dictionary {
  Words words;
  SimpleDic(this.words) : super();

  @override
  void add(Word word){
    if(!words.containsKey(word.term)){
      print("[add] term: ${word.term}, def: ${word.def}");
      words[word.term] = word.def;
    }
    else {
      print("[add] ${word.term} already exists!");
    }
  }

  @override
  dynamic get(String term){
    if(words.containsKey(term)){
      print("[get] ${words[term]}");
      return words[term];
    }
    else {
      return "[get] no word matching $term";
    }
  }

  @override
  void delete(String term){
    if(words.containsKey(term)){
      words.remove(term);
      print("[delete] $term");
    }
    else {
      print("[delete] $term not exists!");
    }
  }

  @override
  void update(String term, dynamic def){
    if(words.containsKey(term)){
      words[term] = def;
      print("[update] $term -> $def");
    }
    else {
      print("[update] $term not exists!");
    }
  }

  @override
  List<String> showAll(){
    List<String> strArr = [];
    for(var val in words.values){
      if(val.runtimeType == String){
        strArr.add(val);
      } 
      else {
        strArr.add(val.toString());
      }
    }
    print("[showAll] $strArr");
    return strArr;
  }

  @override
  int count(){
    print("[count] ${words.length}");
    return words.length;
  }

  @override
  void upsert(Word word){
    if(!words.containsKey(word.term)){
      print("[upsert][a] ${word.term} -> ${word.def}");
      add(word);
    }
    else {
      print("[upsert][u] ${word.term} -> ${word.def}");
      update(word.term, word.def);
    }
  }

  @override
  bool exists(String term){
    print("[exists] ${words.containsKey(term)}");
    return words.containsKey(term);
  }

  @override
  void bulkAdd(List<Word> wordArr){
    print("[bulkAdd] ${wordArr.length}");
    for(var word in wordArr){
      add(word);
    }
  }

  @override
  void bulkDelete(List<dynamic> defArr){
    print("[bulkDelete] ${defArr.length}");
    List<Word> items = words.entries.map((e) => Word(term: e.key, def: e.value)).toList();
    for(var item in items){
      if(defArr.contains(item.def)){
        print("[bulkDelete] ${item.def} exists!");
        delete(item.term);
      }
    }
  }
}

void main() {
  Words words = {};
  var wordic = SimpleDic(words);
  final wordCat = Word(term: "cat", def: "고양이");
  final wordDog = Word(term: "dog", def: "강아지");
  final wordRabbit = Word(term: "rabbit", def: "토끼");
  final wordDynamic = Word(term: "any", def: ["A", 2, true, {}]);

  wordic.add(wordCat);
  print("# get: ${wordic.get("cat")}");
  wordic.update("cat", "야옹이");
  wordic.delete("cat");
  print("# exists: ${wordic.exists("cat")}");
  wordic.upsert(wordCat);
  wordic.bulkAdd([wordDog, wordRabbit, wordDynamic]);
  print("# count: ${wordic.count()}");
  wordic.bulkDelete(["고양이", "강아지"]);
  print("# showAll: ${wordic.showAll()}");
}
