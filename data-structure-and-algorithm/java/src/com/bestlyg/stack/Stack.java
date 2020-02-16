package com.bestlyg.stack;

import com.bestlyg.list.List;
import com.bestlyg.list.arrayList.ArrayList;

public class Stack<E> {
	private List<E> list = new ArrayList<>();

	public void clear() {
		list.clear();
	}

	public int size() {
		return list.size();
	}

	public boolean isEmpty() {
		return list.isEmpty();
	}

	public void push(E element) {
		list.add(element);
	}

	public E pop() {
		return list.remove(list.size() - 1);
	}

	public E top() {
		return list.get(list.size() - 1);
	}

}
