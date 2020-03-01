package com.bestlyg.set;

import java.util.Comparator;

import com.bestlyg.tree.BinaryTree;
import com.bestlyg.tree.RBTree;

public class TreeSet2<E> implements Set<E> {
	private RBTree<E> tree;

	public TreeSet2() {
		this(null);
	}

	public TreeSet2(Comparator<E> comparator) {
		tree = new RBTree<>(comparator);
	}

	@Override
	public int size() {
		return tree.size();
	}

	@Override
	public boolean isEmpty() {
		return tree.isEmpty();
	}

	@Override
	public void clear() {
		tree.clear();
	}

	@Override
	public boolean contains(E element) {
		return tree.contains(element);
	}

	@Override
	public void add(E element) {
		tree.add(element);
	}

	@Override
	public void remove(E element) {
		tree.remove(element);
	}

	@Override
	public void traversal(Visitor<E> visitor) {
		tree.inorder(new BinaryTree.Visitor<E>() {
			@Override
			public boolean visit(E element) {
				return visitor.visit(element);
			}
		});
	}

}
