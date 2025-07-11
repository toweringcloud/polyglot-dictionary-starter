from abc import ABC, abstractmethod
from typing import Any, Dict, List


class Word:
    def __init__(self, term: str, definition: Any):
        self.term = term
        self.definition = definition


class Dictionary(ABC):
    @abstractmethod
    def add(self, word: Word) -> None:
        pass

    @abstractmethod
    def get(self, term: str) -> Any:
        pass

    @abstractmethod
    def delete(self, term: str) -> None:
        pass

    @abstractmethod
    def update(self, term: str, definition: Any) -> None:
        pass

    @abstractmethod
    def show_all(self) -> List[str]:
        pass

    @abstractmethod
    def count(self) -> int:
        pass

    @abstractmethod
    def upsert(self, word: Word) -> None:
        pass

    @abstractmethod
    def exists(self, term: str) -> bool:
        pass

    @abstractmethod
    def bulk_add(self, word_list: List[Word]) -> None:
        pass

    @abstractmethod
    def bulk_delete(self, def_list: List[Any]) -> None:
        pass


class SimpleDic(Dictionary):
    def __init__(self):
        self._words: Dict[str, Any] = {}

    def add(self, word: Word) -> None:
        if word.term not in self._words:
            self._words[word.term] = word.definition
            print(f"[add] term: {word.term}, def: {word.definition}")
        else:
            print(f"[add] {word.term} already exists!")

    def get(self, term: str) -> Any:
        if term in self._words:
            definition = self._words[term]
            print(f"[get] {definition}")
            return definition
        else:
            return f"[get] no word matching {term}"

    def delete(self, term: str) -> None:
        if term in self._words:
            del self._words[term]
            print(f"[delete] {term}")
        else:
            print(f"[delete] {term} not exists!")

    def update(self, term: str, definition: Any) -> None:
        if term in self._words:
            self._words[term] = definition
            print(f"[update] {term} -> {definition}")
        else:
            print(f"[update] {term} not exists!")

    def show_all(self) -> List[str]:
        str_list = [str(val) for val in self._words.values()]
        print(f"[show_all] {', '.join(str_list)}")
        return str_list

    def count(self) -> int:
        count = len(self._words)
        print(f"[count] {count}")
        return count

    def upsert(self, word: Word) -> None:
        if word.term not in self._words:
            print(f"[upsert][a] {word.term} -> {word.definition}")
            self.add(word)
        else:
            print(f"[upsert][u] {word.term} -> {word.definition}")
            self.update(word.term, word.definition)

    def exists(self, term: str) -> bool:
        has_term = term in self._words
        print(f"[exists] {has_term}")
        return has_term

    def bulk_add(self, word_list: List[Word]) -> None:
        print(f"[bulk_add] {len(word_list)}")
        for word in word_list:
            self.add(word)

    def bulk_delete(self, def_list: List[Any]) -> None:
        print(f"[bulk_delete] {len(def_list)}")
        terms_to_delete = [
            term for term, definition in self._words.items()
            if definition in def_list
        ]
        for term in terms_to_delete:
            print(f"[bulk_delete] {self._words[term]} exists!")
            self.delete(term)


def main():
    wordic = SimpleDic()
    
    word_cat = Word("cat", "고양이")
    word_dog = Word("dog", "강아지")
    word_rabbit = Word("rabbit", "토끼")
    word_dynamic = Word("any", ["A", 2, True, {}])

    wordic.add(word_cat)
    print(f'# get: {wordic.get("cat")}')
    wordic.update("cat", "야옹이")
    wordic.delete("cat")
    print(f'# exists: {wordic.exists("cat")}')
    wordic.upsert(word_cat)
    wordic.bulk_add([word_dog, word_rabbit, word_dynamic])
    print(f'# count: {wordic.count()}')
    wordic.bulk_delete(["고양이", "강아지"])
    print(f'# show_all: {wordic.show_all()}')


if __name__ == "__main__":
    main()
