#!/usr/bin/env python3
"""
Relief Grid - Neural Network Style Humanitarian Decision Engine
Advanced visualization of the complete humanitarian response decision-making process
with interconnected nodes, real-time data flow, and comprehensive analytics.
"""

import tkinter as tk
from tkinter import ttk, scrolledtext, Canvas
import random
import time
import threading
import math
from datetime import datetime, timedelta
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple, Any
from enum import Enum
import json

# ===== COLOR SCHEME - MODERN HUMANITARIAN UI =====
class Colors:
    # Primary Colors
    BACKGROUND = "#0f1419"
    SURFACE = "#1a1f2e" 
    CARD = "#232936"
    
    # Accent Colors
    PRIMARY = "#00d4ff"
    SUCCESS = "#00ff88"
    WARNING = "#ffb347"
    DANGER = "#ff6b6b"
    INFO = "#4ecdc4"
    
    # Text Colors
    TEXT_PRIMARY = "#838485"
    TEXT_SECONDARY = "#a8b2d1"
    TEXT_MUTED = "#6b7494"
    
    # Node Colors
    NODE_ACTIVE = "#00d4ff"
    NODE_SUCCESS = "#00ff88"
    NODE_PENDING = "#6b7494"
    NODE_ERROR = "#ff6b6b"
    NODE_PROCESSING = "#ffb347"
    
    # Connection Colors
    CONNECTION_ACTIVE = "#00d4ff"
    CONNECTION_SUCCESS = "#00ff88"
    CONNECTION_INACTIVE = "#3a4159"

# ===== NEURAL NETWORK NODE TYPES =====
class NodeType(Enum):
    INPUT = "input"
    PROCESSING = "processing"
    DECISION = "decision"
    OUTPUT = "output"
    DATA = "data"

class NodeState(Enum):
    INACTIVE = "inactive"
    PROCESSING = "processing"
    ACTIVE = "active"
    SUCCESS = "success"
    ERROR = "error"
    PENDING = "pending"

@dataclass
class NetworkNode:
    """Represents a node in the decision network"""
    id: str
    name: str
    node_type: NodeType
    state: NodeState = NodeState.INACTIVE
    position: Tuple[float, float] = (0, 0)
    data: Dict[str, Any] = field(default_factory=dict)
    connections: List[str] = field(default_factory=list)
    processing_time: float = 0.0
    success_rate: float = 1.0
    throughput: int = 0
    description: str = ""

# ===== ENHANCED DECISION STAGES =====
class DecisionStage(Enum):
    # Input Layer
    DISASTER_DETECTION = "disaster_detection"
    INITIAL_REPORTS = "initial_reports"
    SOCIAL_MEDIA_MONITORING = "social_media_monitoring"
    
    # Processing Layer 1 - Data Collection
    MULTI_SOURCE_VERIFICATION = "multi_source_verification"
    SATELLITE_ANALYSIS = "satellite_analysis"
    FIELD_REPORTS_ANALYSIS = "field_reports_analysis"
    GOVERNMENT_LIAISON = "government_liaison"
    
    # Processing Layer 2 - Assessment
    SITUATION_ANALYSIS = "situation_analysis"
    NEEDS_ASSESSMENT = "needs_assessment"
    RISK_EVALUATION = "risk_evaluation"
    CAPACITY_MAPPING = "capacity_mapping"
    
    # Decision Layer
    RESPONSE_PRIORITIZATION = "response_prioritization"
    RESOURCE_ALLOCATION = "resource_allocation"
    STAKEHOLDER_COORDINATION = "stakeholder_coordination"
    APPROVAL_WORKFLOW = "approval_workflow"
    
    # Output Layer
    MOBILIZATION = "mobilization"
    DEPLOYMENT = "deployment"
    MONITORING = "monitoring"
    IMPACT_MEASUREMENT = "impact_measurement"

# ===== COMPREHENSIVE DATA MODELS =====
@dataclass
class DisasterEvent:
    """Enhanced disaster event with comprehensive data"""
    event_id: str
    disaster_type: str
    location: Dict[str, Any]
    magnitude: float
    affected_population: int
    infrastructure_damage: float
    casualty_estimate: int
    economic_impact_usd: float
    environmental_impact: float
    accessibility: float
    security_level: str
    weather_conditions: Dict[str, Any]
    time_of_occurrence: datetime
    duration_estimate_hours: int
    media_attention: float
    international_interest: float
    coordination_complexity: float
    historical_precedent: bool
    
@dataclass
class ProcessingMetrics:
    """Real-time processing metrics for each node"""
    processing_speed: float
    accuracy_score: float
    confidence_level: float
    data_completeness: float
    source_reliability: float
    verification_status: str
    processing_time_ms: int
    throughput_rate: float
    error_rate: float
    success_probability: float

@dataclass
class NetworkFlow:
    """Represents data flow between nodes"""
    from_node: str
    to_node: str
    data_packet: Dict[str, Any]
    flow_rate: float
    success_rate: float
    latency_ms: int
    packet_size: int
    priority: int

class ReliefGridNeuralEngine:
    """Advanced neural network decision engine"""
    
    def __init__(self):
        self.nodes: Dict[str, NetworkNode] = {}
        self.connections: List[NetworkFlow] = []
        self.active_flows: List[NetworkFlow] = []
        self.processing_queue: List[str] = []
        self.decision_history: List[Dict[str, Any]] = []
        self.performance_metrics: Dict[str, ProcessingMetrics] = {}
        self.current_disaster: Optional[DisasterEvent] = None
        self.network_active = False
        
        self._initialize_network()
        
    def _initialize_network(self):
        """Initialize the complete neural network structure"""
        # Input Layer Nodes
        input_nodes = [
            ("disaster_sensor", "Disaster Detection Sensors", NodeType.INPUT, (100, 150)),
            ("social_monitor", "Social Media Monitor", NodeType.INPUT, (100, 250)),
            ("news_feeds", "News Feed Analysis", NodeType.INPUT, (100, 350)),
            ("citizen_reports", "Citizen Report Portal", NodeType.INPUT, (100, 450)),
            ("government_alerts", "Government Alert Systems", NodeType.INPUT, (100, 550))
        ]
        
        # Processing Layer 1 - Data Collection & Verification
        processing1_nodes = [
            ("verification_engine", "Multi-Source Verification", NodeType.PROCESSING, (300, 150)),
            ("satellite_processor", "Satellite Image Analysis", NodeType.PROCESSING, (300, 250)),
            ("field_aggregator", "Field Report Aggregation", NodeType.PROCESSING, (300, 350)),
            ("credibility_checker", "Source Credibility Analysis", NodeType.PROCESSING, (300, 450)),
            ("geographic_mapper", "Geographic Impact Mapping", NodeType.PROCESSING, (300, 550))
        ]
        
        # Processing Layer 2 - Analysis & Assessment
        processing2_nodes = [
            ("situation_analyzer", "Real-time Situation Analysis", NodeType.PROCESSING, (500, 100)),
            ("needs_calculator", "Humanitarian Needs Calculator", NodeType.PROCESSING, (500, 200)),
            ("risk_assessor", "Multi-factor Risk Assessment", NodeType.PROCESSING, (500, 300)),
            ("capacity_mapper", "Local Capacity Mapping", NodeType.PROCESSING, (500, 400)),
            ("timeline_predictor", "Response Timeline Predictor", NodeType.PROCESSING, (500, 500)),
            ("resource_estimator", "Resource Requirement Estimator", NodeType.PROCESSING, (500, 600))
        ]
        
        # Decision Layer
        decision_nodes = [
            ("priority_ranker", "Response Prioritization Engine", NodeType.DECISION, (700, 150)),
            ("resource_allocator", "Smart Resource Allocation", NodeType.DECISION, (700, 250)),
            ("coordinator", "Multi-Agency Coordination", NodeType.DECISION, (700, 350)),
            ("approval_engine", "Automated Approval Workflow", NodeType.DECISION, (700, 450)),
            ("logistics_optimizer", "Logistics Route Optimizer", NodeType.DECISION, (700, 550))
        ]
        
        # Output Layer
        output_nodes = [
            ("mobilizer", "Response Mobilization", NodeType.OUTPUT, (900, 200)),
            ("dispatcher", "Resource Deployment", NodeType.OUTPUT, (900, 300)),
            ("monitor", "Real-time Monitoring", NodeType.OUTPUT, (900, 400)),
            ("impact_tracker", "Impact Measurement", NodeType.OUTPUT, (900, 500))
        ]
        
        # Add all nodes to the network
        all_nodes = input_nodes + processing1_nodes + processing2_nodes + decision_nodes + output_nodes
        
        for node_id, name, node_type, position in all_nodes:
            self.nodes[node_id] = NetworkNode(
                id=node_id,
                name=name,
                node_type=node_type,
                position=position,
                description=f"Advanced {name.lower()} with AI-powered analysis"
            )
            
        # Define network connections (data flow paths)
        connections = [
            # Input to Processing Layer 1
            ("disaster_sensor", "verification_engine"),
            ("social_monitor", "verification_engine"),
            ("news_feeds", "verification_engine"),
            ("citizen_reports", "field_aggregator"),
            ("government_alerts", "credibility_checker"),
            
            ("disaster_sensor", "satellite_processor"),
            ("social_monitor", "credibility_checker"),
            ("citizen_reports", "geographic_mapper"),
            
            # Processing Layer 1 to Processing Layer 2
            ("verification_engine", "situation_analyzer"),
            ("verification_engine", "needs_calculator"),
            ("satellite_processor", "situation_analyzer"),
            ("satellite_processor", "geographic_mapper"),
            ("field_aggregator", "needs_calculator"),
            ("field_aggregator", "capacity_mapper"),
            ("credibility_checker", "risk_assessor"),
            ("geographic_mapper", "timeline_predictor"),
            ("geographic_mapper", "resource_estimator"),
            
            # Processing Layer 2 to Decision Layer
            ("situation_analyzer", "priority_ranker"),
            ("needs_calculator", "resource_allocator"),
            ("risk_assessor", "approval_engine"),
            ("capacity_mapper", "coordinator"),
            ("timeline_predictor", "logistics_optimizer"),
            ("resource_estimator", "resource_allocator"),
            
            # Cross-connections in Decision Layer
            ("priority_ranker", "coordinator"),
            ("resource_allocator", "logistics_optimizer"),
            ("coordinator", "approval_engine"),
            
            # Decision Layer to Output Layer
            ("priority_ranker", "mobilizer"),
            ("resource_allocator", "dispatcher"),
            ("coordinator", "monitor"),
            ("approval_engine", "mobilizer"),
            ("logistics_optimizer", "dispatcher"),
            ("mobilizer", "impact_tracker"),
            ("dispatcher", "impact_tracker"),
            ("monitor", "impact_tracker")
        ]
        
        # Add connections to nodes
        for from_node, to_node in connections:
            if from_node in self.nodes:
                self.nodes[from_node].connections.append(to_node)
                
        # Initialize performance metrics
        for node_id in self.nodes:
            self.performance_metrics[node_id] = ProcessingMetrics(
                processing_speed=random.uniform(0.5, 2.0),
                accuracy_score=random.uniform(0.85, 0.99),
                confidence_level=random.uniform(0.7, 0.95),
                data_completeness=random.uniform(0.6, 1.0),
                source_reliability=random.uniform(0.7, 0.95),
                verification_status="Pending",
                processing_time_ms=random.randint(50, 500),
                throughput_rate=random.uniform(10, 100),
                error_rate=random.uniform(0.01, 0.05),
                success_probability=random.uniform(0.8, 0.98)
            )

    def process_disaster_event(self, disaster: DisasterEvent):
        """Process a new disaster event through the neural network"""
        self.current_disaster = disaster
        self.network_active = True
        
        # Activate input nodes
        input_nodes = ["disaster_sensor", "social_monitor", "news_feeds", "citizen_reports", "government_alerts"]
        for node_id in input_nodes:
            if node_id in self.nodes:
                self.nodes[node_id].state = NodeState.ACTIVE
                self.nodes[node_id].data = {
                    "disaster_type": disaster.disaster_type,
                    "magnitude": disaster.magnitude,
                    "location": disaster.location,
                    "timestamp": disaster.time_of_occurrence.isoformat()
                }
                
        # Start processing cascade
        self.processing_queue = input_nodes.copy()
        
    def process_network_step(self) -> bool:
        """Process one step of the neural network"""
        if not self.processing_queue or not self.network_active:
            return False
            
        current_node_id = self.processing_queue.pop(0)
        current_node = self.nodes[current_node_id]
        
        # Simulate processing time
        current_node.state = NodeState.PROCESSING
        current_node.processing_time = time.time()
        
        # Process the node
        processing_success = self._simulate_node_processing(current_node)
        
        if processing_success:
            current_node.state = NodeState.SUCCESS
            current_node.throughput += 1
            
            # Activate connected nodes
            for connected_node_id in current_node.connections:
                if connected_node_id in self.nodes:
                    connected_node = self.nodes[connected_node_id]
                    if connected_node.state == NodeState.INACTIVE:
                        connected_node.state = NodeState.PENDING
                        if connected_node_id not in self.processing_queue:
                            self.processing_queue.append(connected_node_id)
                            
                    # Create data flow
                    flow = NetworkFlow(
                        from_node=current_node_id,
                        to_node=connected_node_id,
                        data_packet=current_node.data.copy(),
                        flow_rate=random.uniform(0.8, 1.0),
                        success_rate=random.uniform(0.9, 1.0),
                        latency_ms=random.randint(10, 100),
                        packet_size=random.randint(1024, 8192),
                        priority=random.randint(1, 5)
                    )
                    self.active_flows.append(flow)
        else:
            current_node.state = NodeState.ERROR
            
        return len(self.processing_queue) > 0
        
    def _simulate_node_processing(self, node: NetworkNode) -> bool:
        """Simulate realistic node processing with various outcomes"""
        metrics = self.performance_metrics[node.id]
        
        # Simulate processing based on node type
        if node.node_type == NodeType.INPUT:
            # Input nodes detect and gather data
            success_rate = 0.95
            node.data.update({
                "raw_data_points": random.randint(10, 100),
                "source_confidence": random.uniform(0.7, 0.95),
                "detection_accuracy": random.uniform(0.85, 0.99)
            })
            
        elif node.node_type == NodeType.PROCESSING:
            # Processing nodes analyze and transform data
            success_rate = metrics.success_probability
            node.data.update({
                "processed_insights": random.randint(5, 25),
                "analysis_confidence": metrics.confidence_level,
                "data_quality_score": metrics.data_completeness,
                "processing_status": "completed"
            })
            
        elif node.node_type == NodeType.DECISION:
            # Decision nodes make critical choices
            success_rate = 0.88
            decision_score = random.uniform(0.5, 0.95)
            node.data.update({
                "decision_confidence": decision_score,
                "alternatives_considered": random.randint(3, 8),
                "risk_assessment": random.uniform(0.1, 0.7),
                "recommendation": "proceed" if decision_score > 0.75 else "review_required"
            })
            
        elif node.node_type == NodeType.OUTPUT:
            # Output nodes execute actions
            success_rate = 0.92
            node.data.update({
                "action_items": random.randint(2, 12),
                "deployment_readiness": random.uniform(0.8, 1.0),
                "resource_allocation": f"${random.randint(100000, 5000000):,}",
                "timeline_estimate": f"{random.randint(4, 48)} hours"
            })
            
        # Update metrics
        metrics.verification_status = "Verified" if random.random() < success_rate else "Failed"
        metrics.processing_time_ms = random.randint(metrics.processing_time_ms - 50, metrics.processing_time_ms + 100)
        
        return random.random() < success_rate

    def get_network_status(self) -> Dict[str, Any]:
        """Get comprehensive network status"""
        active_nodes = sum(1 for node in self.nodes.values() if node.state in [NodeState.ACTIVE, NodeState.PROCESSING, NodeState.SUCCESS])
        total_throughput = sum(node.throughput for node in self.nodes.values())
        avg_success_rate = sum(metrics.success_probability for metrics in self.performance_metrics.values()) / len(self.performance_metrics)
        
        return {
            "network_active": self.network_active,
            "active_nodes": active_nodes,
            "total_nodes": len(self.nodes),
            "active_flows": len(self.active_flows),
            "total_throughput": total_throughput,
            "average_success_rate": avg_success_rate,
            "processing_queue_length": len(self.processing_queue),
            "current_disaster": self.current_disaster.disaster_type if self.current_disaster else None
        }

class ReliefGridNeuralUI:
    """Advanced neural network visualization interface"""
    
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Relief Grid - Neural Decision Engine")
        self.root.geometry("1800x1200")
        self.root.configure(bg=Colors.BACKGROUND)
        
        # Set modern font
        self.font_large = ("Segoe UI", 14, "bold")
        self.font_medium = ("Segoe UI", 11)
        self.font_small = ("Segoe UI", 9)
        
        self.engine = ReliefGridNeuralEngine()
        self.animation_active = False
        self.selected_node = None
        
        self.setup_ui()
        self.start_animations()
        
    def setup_ui(self):
        """Setup the complete user interface"""
        # Title Bar
        title_frame = tk.Frame(self.root, bg=Colors.SURFACE, height=80)
        title_frame.pack(fill=tk.X)
        title_frame.pack_propagate(False)
        
        title_container = tk.Frame(title_frame, bg=Colors.SURFACE)
        title_container.pack(expand=True, fill=tk.BOTH)
        
        title_label = tk.Label(title_container, 
                             text="RELIEF GRID", 
                             font=("Segoe UI", 24, "bold"),
                             fg=Colors.PRIMARY, bg=Colors.SURFACE)
        title_label.pack(side=tk.LEFT, padx=30, pady=20)
        
        subtitle_label = tk.Label(title_container,
                                text="Neural Decision Engine - Real-time Humanitarian Response Coordination",
                                font=self.font_medium,
                                fg=Colors.TEXT_SECONDARY, bg=Colors.SURFACE)
        subtitle_label.pack(side=tk.LEFT, padx=10, pady=20)
        
        # Status indicators
        self.status_frame = tk.Frame(title_container, bg=Colors.SURFACE)
        self.status_frame.pack(side=tk.RIGHT, padx=30, pady=20)
        
        # Main Content Area
        content_frame = tk.Frame(self.root, bg=Colors.BACKGROUND)
        content_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Left Panel - Network Visualization
        left_panel = tk.Frame(content_frame, bg=Colors.CARD, relief=tk.RAISED, bd=1)
        left_panel.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0, 5))
        
        # Network Canvas
        canvas_frame = tk.Frame(left_panel, bg=Colors.CARD)
        canvas_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        tk.Label(canvas_frame, text="NEURAL NETWORK VISUALIZATION", 
                font=self.font_large, fg=Colors.TEXT_PRIMARY, bg=Colors.CARD).pack(pady=(0, 10))
        
        self.canvas = Canvas(canvas_frame, bg=Colors.BACKGROUND, height=800, 
                           highlightthickness=0, bd=0)
        self.canvas.pack(fill=tk.BOTH, expand=True)
        self.canvas.bind("<Button-1>", self.on_node_click)
        
        # Right Panel - Control and Data
        right_panel = tk.Frame(content_frame, bg=Colors.CARD, width=500)
        right_panel.pack(side=tk.RIGHT, fill=tk.Y, padx=(5, 0))
        right_panel.pack_propagate(False)
        
        # Control Section
        control_section = tk.Frame(right_panel, bg=Colors.CARD)
        control_section.pack(fill=tk.X, padx=10, pady=10)
        
        tk.Label(control_section, text="DISASTER SIMULATION CONTROL", 
                font=self.font_large, fg=Colors.TEXT_PRIMARY, bg=Colors.CARD).pack(pady=(0, 10))
        
        # Control buttons
        button_frame = tk.Frame(control_section, bg=Colors.CARD)
        button_frame.pack(fill=tk.X, pady=10)
        
        self.create_modern_button(button_frame, "Start New Disaster", self.start_disaster_simulation, Colors.DANGER)
        self.create_modern_button(button_frame, "Process Network", self.process_network_step, Colors.SUCCESS)
        self.create_modern_button(button_frame, "Reset Network", self.reset_network, Colors.WARNING)
        
        # Network Status
        status_section = tk.Frame(right_panel, bg=Colors.SURFACE, relief=tk.RAISED, bd=1)
        status_section.pack(fill=tk.X, padx=10, pady=10)
        
        tk.Label(status_section, text="NETWORK STATUS", 
                font=self.font_large, fg=Colors.TEXT_PRIMARY, bg=Colors.SURFACE).pack(pady=10)
        
        self.status_text = scrolledtext.ScrolledText(status_section, height=8, 
                                                   font=self.font_small, 
                                                   bg=Colors.BACKGROUND, fg=Colors.TEXT_SECONDARY,
                                                   insertbackground=Colors.PRIMARY)
        self.status_text.pack(fill=tk.X, padx=10, pady=(0, 10))
        
        # Node Details Section
        details_section = tk.Frame(right_panel, bg=Colors.SURFACE, relief=tk.RAISED, bd=1)
        details_section.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        tk.Label(details_section, text="NODE DETAILS", 
                font=self.font_large, fg=Colors.TEXT_PRIMARY, bg=Colors.SURFACE).pack(pady=10)
        
        self.details_text = scrolledtext.ScrolledText(details_section, height=15, 
                                                    font=self.font_small,
                                                    bg=Colors.BACKGROUND, fg=Colors.TEXT_SECONDARY,
                                                    insertbackground=Colors.PRIMARY)
        self.details_text.pack(fill=tk.BOTH, expand=True, padx=10, pady=(0, 10))
        
        # Bottom Status Bar
        self.bottom_status = tk.Frame(self.root, bg=Colors.SURFACE, height=40)
        self.bottom_status.pack(fill=tk.X, side=tk.BOTTOM)
        self.bottom_status.pack_propagate(False)
        
        self.status_label = tk.Label(self.bottom_status, 
                                   text="Relief Grid Neural Engine Ready - Click 'Start New Disaster' to begin simulation",
                                   font=self.font_small, fg=Colors.TEXT_SECONDARY, bg=Colors.SURFACE)
        self.status_label.pack(side=tk.LEFT, padx=20, pady=10)
        
        self.performance_label = tk.Label(self.bottom_status, 
                                        text="Performance: Standby",
                                        font=self.font_small, fg=Colors.INFO, bg=Colors.SURFACE)
        self.performance_label.pack(side=tk.RIGHT, padx=20, pady=10)
        
    def create_modern_button(self, parent, text, command, color):
        """Create a modern styled button"""
        btn = tk.Button(parent, text=text, command=command,
                       font=self.font_medium, fg=Colors.TEXT_PRIMARY,
                       bg=color, activebackground=color, 
                       relief=tk.FLAT, padx=20, pady=8,
                       cursor="hand2")
        btn.pack(fill=tk.X, pady=2)
        return btn
        
    def draw_network(self):
        """Draw the neural network visualization"""
        self.canvas.delete("all")
        
        # Draw connections first (so they appear behind nodes)
        self.draw_connections()
        
        # Draw active data flows
        self.draw_data_flows()
        
        # Draw nodes
        self.draw_nodes()
        
        # Draw network statistics overlay
        self.draw_network_stats()
        
    def draw_connections(self):
        """Draw connections between nodes"""
        for node_id, node in self.engine.nodes.items():
            for connected_id in node.connections:
                if connected_id in self.engine.nodes:
                    from_pos = node.position
                    to_pos = self.engine.nodes[connected_id].position
                    
                    # Determine connection color based on activity
                    if (node.state in [NodeState.SUCCESS, NodeState.ACTIVE] and 
                        self.engine.nodes[connected_id].state != NodeState.INACTIVE):
                        color = Colors.CONNECTION_ACTIVE
                        width = 2
                    elif node.state == NodeState.SUCCESS:
                        color = Colors.CONNECTION_SUCCESS
                        width = 2
                    else:
                        color = Colors.CONNECTION_INACTIVE
                        width = 1
                        
                    self.canvas.create_line(from_pos[0], from_pos[1], 
                                          to_pos[0], to_pos[1],
                                          fill=color, width=width, smooth=True)
                                          
    def draw_data_flows(self):
        """Draw animated data flows between nodes"""
        for flow in self.engine.active_flows:
            if flow.from_node in self.engine.nodes and flow.to_node in self.engine.nodes:
                from_pos = self.engine.nodes[flow.from_node].position
                to_pos = self.engine.nodes[flow.to_node].position
                
                # Calculate animation position
                progress = (time.time() % 2) / 2  # 2-second animation cycle
                x = from_pos[0] + (to_pos[0] - from_pos[0]) * progress
                y = from_pos[1] + (to_pos[1] - from_pos[1]) * progress
                
                # Draw animated data packet
                self.canvas.create_oval(x-3, y-3, x+3, y+3, 
                                      fill=Colors.PRIMARY, outline=Colors.PRIMARY)
                                      
    def draw_nodes(self):
        """Draw network nodes with state-based styling"""
        for node_id, node in self.engine.nodes.items():
            x, y = node.position
            
            # Determine node appearance based on state and type
            if node.state == NodeState.INACTIVE:
                color = Colors.NODE_PENDING
                outline_color = Colors.TEXT_MUTED
                outline_width = 1
            elif node.state == NodeState.PROCESSING:
                color = Colors.NODE_PROCESSING
                outline_color = Colors.NODE_PROCESSING
                outline_width = 3
            elif node.state == NodeState.ACTIVE:
                color = Colors.NODE_ACTIVE
                outline_color = Colors.NODE_ACTIVE
                outline_width = 2
            elif node.state == NodeState.SUCCESS:
                color = Colors.NODE_SUCCESS
                outline_color = Colors.NODE_SUCCESS
                outline_width = 2
            elif node.state == NodeState.ERROR:
                color = Colors.NODE_ERROR
                outline_color = Colors.NODE_ERROR
                outline_width = 2
            else:  # PENDING
                color = Colors.NODE_PENDING
                outline_color = Colors.NODE_PENDING
                outline_width = 2
                
            # Different shapes for different node types
            if node.node_type == NodeType.INPUT:
                # Square for input nodes
                size = 25
                self.canvas.create_rectangle(x-size, y-size, x+size, y+size,
                                           fill=color, outline=outline_color, 
                                           width=outline_width, tags=f"node_{node_id}")
            elif node.node_type == NodeType.OUTPUT:
                # Diamond for output nodes
                size = 25
                points = [x, y-size, x+size, y, x, y+size, x-size, y]
                self.canvas.create_polygon(points, fill=color, outline=outline_color,
                                         width=outline_width, tags=f"node_{node_id}")
            elif node.node_type == NodeType.DECISION:
                # Hexagon for decision nodes
                size = 25
                angle_offset = math.pi / 6
                points = []
                for i in range(6):
                    angle = i * math.pi / 3 + angle_offset
                    px = x + size * math.cos(angle)
                    py = y + size * math.sin(angle)
                    points.extend([px, py])
                self.canvas.create_polygon(points, fill=color, outline=outline_color,
                                         width=outline_width, tags=f"node_{node_id}")
            else:
                # Circle for processing nodes
                size = 25
                self.canvas.create_oval(x-size, y-size, x+size, y+size,
                                      fill=color, outline=outline_color,
                                      width=outline_width, tags=f"node_{node_id}")
                                      
            # Add node throughput indicator
            if node.throughput > 0:
                self.canvas.create_text(x, y-40, text=f"{node.throughput}", 
                                      font=("Segoe UI", 8, "bold"), 
                                      fill=Colors.SUCCESS, tags=f"node_{node_id}")
                                      
            # Add node label
            self.canvas.create_text(x, y+40, text=node.name[:20], 
                                  font=("Segoe UI", 8), fill=Colors.TEXT_SECONDARY, 
                                  tags=f"node_{node_id}", width=100)
                                  
            # Highlight selected node
            if self.selected_node == node_id:
                self.canvas.create_oval(x-30, y-30, x+30, y+30, 
                                      outline=Colors.PRIMARY, width=3, 
                                      tags=f"node_{node_id}")
                                      
    def draw_network_stats(self):
        """Draw real-time network statistics overlay"""
        status = self.engine.get_network_status()
        
        # Top-right statistics box
        stats_text = f"""NETWORK STATUS
            Active: {status['active_nodes']}/{status['total_nodes']} nodes
            Flows: {status['active_flows']} active
            Throughput: {status['total_throughput']} ops
            Success Rate: {status['average_success_rate']:.1%}
            Queue: {status['processing_queue_length']} pending"""
        self.canvas.create_rectangle(self.canvas.winfo_width()-200, 10, 
                                   self.canvas.winfo_width()-10, 130,
                                   fill=Colors.SURFACE, outline=Colors.TEXT_MUTED)
        self.canvas.create_text(self.canvas.winfo_width()-105, 70, 
                              text=stats_text, font=("Segoe UI", 9),
                              fill=Colors.TEXT_SECONDARY, justify=tk.CENTER)
                              
    def on_node_click(self, event):
        """Handle node click events"""
        # Find clicked node
        clicked_items = self.canvas.find_closest(event.x, event.y)
        for item in clicked_items:
            tags = self.canvas.gettags(item)
            for tag in tags:
                if tag.startswith("node_"):
                    node_id = tag.replace("node_", "")
                    if node_id in self.engine.nodes:
                        self.selected_node = node_id
                        self.show_node_details(node_id)
                        self.draw_network()
                        return
                        
    def show_node_details(self, node_id: str):
        """Display detailed information about a selected node"""
        if node_id not in self.engine.nodes:
            return
            
        node = self.engine.nodes[node_id]
        metrics = self.engine.performance_metrics[node_id]
        
        details = f"""NODE DETAILS: {node.name}
{'='*50}

BASIC INFORMATION:
• Node ID: {node.id}
• Type: {node.node_type.value.title()}
• State: {node.state.value.title()}
• Position: ({node.position[0]}, {node.position[1]})

PERFORMANCE METRICS:
• Processing Speed: {metrics.processing_speed:.2f}x
• Accuracy Score: {metrics.accuracy_score:.1%}
• Confidence Level: {metrics.confidence_level:.1%}
• Data Completeness: {metrics.data_completeness:.1%}
• Source Reliability: {metrics.source_reliability:.1%}
• Processing Time: {metrics.processing_time_ms}ms
• Throughput Rate: {metrics.throughput_rate:.1f} ops/sec
• Error Rate: {metrics.error_rate:.2%}
• Success Probability: {metrics.success_probability:.1%}

OPERATIONAL STATUS:
• Verification Status: {metrics.verification_status}
• Total Throughput: {node.throughput} operations
• Connected Nodes: {len(node.connections)}
• Processing Time: {node.processing_time:.2f}s

CONNECTIONS:
{chr(10).join(f"• → {conn}" for conn in node.connections)}

CURRENT DATA:
"""
        
        if node.data:
            for key, value in node.data.items():
                if isinstance(value, float):
                    details += f"• {key.replace('_', ' ').title()}: {value:.3f}\n"
                elif isinstance(value, dict):
                    details += f"• {key.replace('_', ' ').title()}: {len(value)} items\n"
                else:
                    details += f"• {key.replace('_', ' ').title()}: {value}\n"
        else:
            details += "• No data available\n"
            
        details += f"""

DESCRIPTION:
{node.description}
"""
        
        self.details_text.delete(1.0, tk.END)
        self.details_text.insert(tk.END, details)
        
    def start_disaster_simulation(self):
        """Start a new disaster simulation"""
        # Generate realistic disaster scenarios
        disaster_types = [
            "Magnitude 7.2 Earthquake", "Category 4 Hurricane", "Flash Flood Emergency", 
            "Disease Outbreak (Cholera)", "Refugee Crisis", "Wildfire Emergency",
            "Tsunami Alert", "Volcanic Eruption", "Severe Drought", "Armed Conflict"
        ]
        
        locations = [
            {"country": "Haiti", "province": "Sud", "district": "Les Cayes", "coordinates": (18.2, -73.75)},
            {"country": "Philippines", "province": "Leyte", "district": "Tacloban", "coordinates": (11.25, 125.0)},
            {"country": "Bangladesh", "province": "Chittagong", "district": "Cox's Bazar", "coordinates": (21.45, 92.0)},
            {"country": "Syria", "province": "Aleppo", "district": "Aleppo City", "coordinates": (36.2, 37.16)},
            {"country": "Somalia", "province": "Bay", "district": "Baidoa", "coordinates": (3.11, 43.65)},
             {"country": "India", "province": "Kashmir", "district": "Srinagar", "coordinates": (22.5, 11.91)},
            {"country": "Yemen", "province": "Hodeidah", "district": "Al Hudaydah", "coordinates": (14.8, 42.95)}
        ]
        
        disaster = DisasterEvent(
            event_id=f"RG_{random.randint(10000, 99999)}",
            disaster_type=random.choice(disaster_types),
            location=random.choice(locations),
            magnitude=random.uniform(5.0, 9.8),
            affected_population=random.randint(5000, 500000),
            infrastructure_damage=random.uniform(0.2, 0.9),
            casualty_estimate=random.randint(50, 10000),
            economic_impact_usd=random.uniform(10e6, 5e9),
            environmental_impact=random.uniform(0.1, 0.8),
            accessibility=random.uniform(0.3, 0.9),
            security_level=random.choice(["Safe", "Moderate Risk", "High Risk", "Extremely Dangerous"]),
            weather_conditions={"forecast": random.choice(["Clear", "Stormy", "Deteriorating"])},
            time_of_occurrence=datetime.now(),
            duration_estimate_hours=random.randint(6, 168),
            media_attention=random.uniform(0.4, 1.0),
            international_interest=random.uniform(0.3, 0.9),
            coordination_complexity=random.uniform(0.5, 0.95),
            historical_precedent=random.choice([True, False])
        )
        
        # Reset network and start processing
        self.reset_network()
        self.engine.process_disaster_event(disaster)
        
        self.status_label.config(text=f"Processing: {disaster.disaster_type} in {disaster.location['district']}")
        
        # Update status display
        self.update_status_display()
        
    def process_network_step(self):
        """Process one step of the neural network"""
        if self.engine.process_network_step():
            self.status_label.config(text="Network processing... click again to continue")
        else:
            self.status_label.config(text="Network processing complete - all nodes processed")
            self.engine.network_active = False
            
        self.update_status_display()
        self.draw_network()
        
    def reset_network(self):
        """Reset the neural network to initial state"""
        for node in self.engine.nodes.values():
            node.state = NodeState.INACTIVE
            node.throughput = 0
            node.data.clear()
            
        self.engine.active_flows.clear()
        self.engine.processing_queue.clear()
        self.engine.network_active = False
        self.engine.current_disaster = None
        self.selected_node = None
        
        self.status_label.config(text="Network reset - ready for new disaster simulation")
        self.update_status_display()
        self.draw_network()
        
    def update_status_display(self):
        """Update the network status display"""
        status = self.engine.get_network_status()
        
        status_text = f"""RELIEF GRID NEURAL ENGINE STATUS
{'='*50}

NETWORK OVERVIEW:
• Status: {"ACTIVE" if status['network_active'] else "STANDBY"}
• Active Nodes: {status['active_nodes']}/{status['total_nodes']}
• Processing Queue: {status['processing_queue_length']} pending
• Active Data Flows: {status['active_flows']}
• Total Network Throughput: {status['total_throughput']} operations

PERFORMANCE METRICS:
• Average Success Rate: {status['average_success_rate']:.1%}
• Network Efficiency: {(status['active_nodes']/status['total_nodes']*100):.1f}%
• Processing Status: {"Processing" if status['processing_queue_length'] > 0 else "Idle"}

CURRENT DISASTER:
• Type: {status['current_disaster'] or "None"}
• Network State: {"Response Active" if status['network_active'] else "Monitoring"}

NODES BY STATE:
"""
        
        # Count nodes by state
        state_counts = {}
        for node in self.engine.nodes.values():
            state = node.state.value.title()
            state_counts[state] = state_counts.get(state, 0) + 1
            
        for state, count in state_counts.items():
            status_text += f"• {state}: {count} nodes\n"
            
        if self.engine.current_disaster:
            disaster = self.engine.current_disaster
            status_text += f"""

DISASTER DETAILS:
• Event ID: {disaster.event_id}
• Location: {disaster.location['district']}, {disaster.location['country']}
• Magnitude: {disaster.magnitude:.1f}
• Affected Population: {disaster.affected_population:,}
• Infrastructure Damage: {disaster.infrastructure_damage:.1%}
• Security Level: {disaster.security_level}
• Estimated Duration: {disaster.duration_estimate_hours} hours
"""

        self.status_text.delete(1.0, tk.END)
        self.status_text.insert(tk.END, status_text)
        
        # Update performance label
        if status['network_active']:
            efficiency = (status['active_nodes']/status['total_nodes']*100)
            self.performance_label.config(
                text=f"Performance: {efficiency:.1f}% efficiency, {status['total_throughput']} ops",
                fg=Colors.SUCCESS if efficiency > 70 else Colors.WARNING
            )
        else:
            self.performance_label.config(text="Performance: Standby", fg=Colors.INFO)
            
    def start_animations(self):
        """Start the animation loop"""
        self.animation_active = True
        self.animate()
        
    def animate(self):
        """Animation loop for real-time updates"""
        if self.animation_active:
            self.draw_network()
            # Update every 500ms for smooth animation
            self.root.after(500, self.animate)
            
    def run(self):
        """Run the application"""
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
        self.root.mainloop()
        
    def on_closing(self):
        """Handle application closing"""
        self.animation_active = False
        self.root.destroy()

if __name__ == "__main__":
    print("🚀 Starting Relief Grid Neural Decision Engine...")
    print("Advanced humanitarian response coordination with AI-powered decision making")
    print("Click nodes to see detailed analysis | Use controls to simulate disaster scenarios")
    
    app = ReliefGridNeuralUI()
    app.run()