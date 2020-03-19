package com.bestlyg.utils;

import com.bestlyg.graph.Graph;
import com.bestlyg.graph.Graph.WeightManager;
import com.bestlyg.graph.ListGraph;

public class Graphs {
	static WeightManager<Double> weightManager = new WeightManager<Double>() {
		public int compare(Double w1, Double w2) {
			return w1.compareTo(w2);
		}

		public Double add(Double w1, Double w2) {
			return w1 + w2;
		}

		@Override
		public Double zero() {
			return 0.0;
		}
	};

	/**
	 * 有向图
	 */
	private static Graph<Object, Double> directedGraph(Object[][] GraphData) {
		Graph<Object, Double> graph = new ListGraph<>(weightManager);
		for (Object[] edge : GraphData) {
			if (edge.length == 1) {
				graph.addVertex(edge[0]);
			} else if (edge.length == 2) {
				graph.addEdge(edge[0], edge[1]);
			} else if (edge.length == 3) {
				double weight = Double.parseDouble(edge[2].toString());
				graph.addEdge(edge[0], edge[1], weight);
			}
		}
		return graph;
	}

	/**
	 * 无向图
	 * 
	 * @param GraphData
	 * @return
	 */
	private static Graph<Object, Double> undirectedGraph(Object[][] GraphData) {
		Graph<Object, Double> graph = new ListGraph<>(weightManager);
		for (Object[] edge : GraphData) {
			if (edge.length == 1) {
				graph.addVertex(edge[0]);
			} else if (edge.length == 2) {
				graph.addEdge(edge[0], edge[1]);
				graph.addEdge(edge[1], edge[0]);
			} else if (edge.length == 3) {
				double weight = Double.parseDouble(edge[2].toString());
				graph.addEdge(edge[0], edge[1], weight);
				graph.addEdge(edge[1], edge[0], weight);
			}
		}
		return graph;
	}
}
