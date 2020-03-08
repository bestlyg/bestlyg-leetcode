package com.bestlyg.queue;

import java.util.Comparator;

import com.bestlyg.heap.BinaryHeap;

public class PriorityQueue<E> {
	private BinaryHeap<E> heap = new BinaryHeap<>();

	public PriorityQueue(Comparator<E> comparator) {
		heap = new BinaryHeap<>(comparator);
	}

	public PriorityQueue() {
		this(null);
	}

	public int size() {
		return heap.size();
	}

	public boolean isEmpty() {
		return heap.isEmpty();
	}

	public void clear() {
		heap.clear();
	}

	public void enQueue(E element) {
		heap.add(element);
	}

	public E deQueue() {
		return heap.remove();
	}

	public E front() {
		return heap.get();
	}
}
