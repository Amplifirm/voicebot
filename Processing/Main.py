#!/usr/bin/env python3
"""
Relief Grid Multi-Step Decision Funnel Simulation
Shows the complete humanitarian response decision-making process
"""

import tkinter as tk
from tkinter import ttk, scrolledtext
import random
import time
import threading
from datetime import datetime, timedelta
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum
import json

# ===== DECISION FUNNEL STAGES =====
class FunnelStage(Enum):
    DISASTER_OCCURS = "1. Disaster Occurs"
    DISASTER_REPORTED = "2. Disaster Reported" 
    VERIFICATION = "3. Verification Process"
    DATA_GATHERING = "4. Multi-Source Data Gathering"
    SITUATION_ASSESSMENT = "5. Real Situation Assessment"
    NEEDS_VS_WANTS = "6. Process Needs vs Wants"
    LOCAL_SUPPORT_ASSESSMENT = "7. Process Local Support"
    DIRECTOR_APPROVAL = "8. Director Approval Required"
    MOBILIZE_CARE = "9. Mobilize Care"
    IMPACT_REPORTING = "10. Report Reduction/Impact"

# ===== ALL VARIABLES THAT AFFECT DECISIONS =====

@dataclass
class DisasterEvent:
    """The actual disaster occurrence with all measurable variables"""
    event_id: str
    disaster_type: str
    location: dict  # {country, province, district, coordinates}
    magnitude: float  # 1-10 scale
    affected_population: int
    infrastructure_damage: float  # 0-1 scale
    casualty_estimate: int
    economic_impact_usd: float
    environmental_impact: float  # 0-1 scale
    accessibility: float  # 0-1 scale (how easy to reach)
    security_level: str  # "Safe", "Moderate Risk", "High Risk", "Extremely Dangerous"
    weather_conditions: dict
    time_of_occurrence: datetime
    duration_estimate_hours: int

@dataclass 
class DisasterReport:
    """A report about the disaster from various sources"""
    report_id: str
    source_type: str
    source_reliability: float  # 0-1
    reporter_location: str
    report_timestamp: datetime
    reported_casualties: int
    reported_affected: int
    reported_severity: str
    includes_media: bool
    language: str
    translation_confidence: float
    contains_coordinates: bool
    social_media_virality: int  # 0-100
    government_acknowledgment: bool

@dataclass
class VerificationData:
    """All data used in verification process"""
    satellite_imagery_available: bool
    satellite_damage_assessment: float  # 0-1
    multiple_source_correlation: float  # 0-1
    government_confirmation: bool
    international_media_coverage: bool
    social_media_verification_score: float
    expert_analysis_available: bool
    historical_disaster_pattern_match: float
    verification_confidence: float  # Final score 0-1

@dataclass
class MultiSourceData:
    """Data gathered from multiple sources"""
    un_ocha_report: Optional[dict]
    government_official_statement: Optional[dict]
    ngo_field_reports: List[dict]
    media_reports: List[dict]
    satellite_analysis: Optional[dict]
    social_media_sentiment: dict
    academic_expert_assessment: Optional[dict]
    local_authority_reports: List[dict]
    humanitarian_partner_intel: List[dict]

@dataclass
class SituationAssessment:
    """Real situation assessment after data analysis"""
    confirmed_casualties: int
    confirmed_affected_population: int
    infrastructure_damage_verified: float
    immediate_life_threat_level: str  # "None", "Low", "Medium", "High", "Critical"
    displacement_numbers: int
    access_routes_status: dict
    security_assessment: str
    weather_forecast_impact: str
    disease_outbreak_risk: float
    food_security_impact: float
    water_access_impact: float
    shelter_needs_assessment: int
    medical_needs_assessment: dict

@dataclass
class NeedsVsWantsAnalysis:
    """Analysis separating critical needs from wants"""
    life_saving_needs: List[str]
    critical_medical_needs: List[str] 
    basic_survival_needs: List[str]
    protection_needs: List[str]
    nice_to_have_items: List[str]
    luxury_items: List[str]
    needs_priority_ranking: List[Tuple[str, int]]  # (need, priority_score)
    resource_scarcity_factors: dict
    cost_benefit_analysis: dict

@dataclass
class LocalSupportAssessment:
    """Assessment of local capacity and support"""
    government_response_capacity: float  # 0-1
    local_ngo_capacity: float
    community_self_help_capacity: float
    private_sector_involvement: float
    religious_organization_support: float
    diaspora_community_support: float
    existing_infrastructure_usability: float
    local_medical_capacity: float
    local_food_supply_capacity: float
    cultural_acceptance_factors: dict
    language_barriers: List[str]
    political_stability_factor: float

@dataclass
class DirectorApprovalFactors:
    """All factors directors consider for approval"""
    total_estimated_cost: float
    funding_source_availability: dict
    organizational_mandate_alignment: float
    political_sensitivity_score: float
    media_attention_level: int
    donor_interest_likelihood: float
    operational_complexity: float
    security_risk_to_staff: float
    reputation_risk_assessment: float
    competitor_organization_involvement: dict
    success_probability: float
    timeline_to_implementation: int
    staff_availability: dict
    equipment_availability: dict

@dataclass
class MobilizationPlan:
    """Actual care mobilization details"""
    approved_interventions: List[str]
    resource_allocation: dict
    personnel_deployment: dict
    timeline_milestones: List[Tuple[str, datetime]]
    budget_breakdown: dict
    logistics_plan: dict
    monitoring_framework: dict
    exit_strategy: dict
    coordination_structure: dict

@dataclass
class ImpactMeasurement:
    """Measuring reduction/impact of intervention"""
    lives_saved: int
    people_assisted: int
    reduction_in_suffering_score: float
    infrastructure_restored: dict
    economic_impact_prevented: float
    long_term_resilience_built: float
    community_satisfaction_score: float
    cost_per_beneficiary: float
    intervention_efficiency_score: float

class ReliefGridDecisionEngine:
    def __init__(self):
        self.current_funnel_stage = FunnelStage.DISASTER_OCCURS
        self.decision_variables = {}
        self.funnel_data = {}
        
    def process_disaster_occurrence(self, disaster: DisasterEvent) -> bool:
        """Stage 1: Disaster Occurs - Natural phenomenon happens"""
        self.funnel_data['disaster_event'] = disaster
        
        # Some disasters may not be immediately detectable
        detection_probability = self._calculate_detection_probability(disaster)
        
        if random.random() < detection_probability:
            self.current_funnel_stage = FunnelStage.DISASTER_REPORTED
            return True
        return False  # Disaster occurred but not detected yet
    
    def _calculate_detection_probability(self, disaster: DisasterEvent) -> float:
        """Calculate probability of disaster being detected/reported"""
        factors = {
            'magnitude': disaster.magnitude / 10,
            'population_density': min(disaster.affected_population / 10000, 1),
            'accessibility': disaster.accessibility,
            'infrastructure': 1 - disaster.infrastructure_damage,
            'media_presence': random.uniform(0.3, 0.9)
        }
        return sum(factors.values()) / len(factors)
    
    def process_disaster_reporting(self, reports: List[DisasterReport]) -> Tuple[bool, str]:
        """Stage 2: Disaster gets reported through various channels"""
        self.funnel_data['reports'] = reports
        
        # Multiple decision paths possible here
        if not reports:
            return False, "No reports received"
        
        # Check if any high-reliability sources
        high_reliability_reports = [r for r in reports if r.source_reliability > 0.7]
        viral_reports = [r for r in reports if r.social_media_virality > 50]
        government_reports = [r for r in reports if r.government_acknowledgment]
        
        if high_reliability_reports or len(viral_reports) > 3 or government_reports:
            self.current_funnel_stage = FunnelStage.VERIFICATION
            return True, "Reports trigger verification process"
        elif len(reports) > 5:
            self.current_funnel_stage = FunnelStage.VERIFICATION
            return True, "Volume of reports triggers verification"
        else:
            return False, "Insufficient credible reports to trigger verification"
    
    def process_verification(self, verification_data: VerificationData) -> Tuple[bool, str, float]:
        """Stage 3: Verification Process - Multiple paths possible"""
        self.funnel_data['verification'] = verification_data
        
        # Complex verification algorithm
        verification_score = self._calculate_verification_score(verification_data)
        
        if verification_score > 0.8:
            self.current_funnel_stage = FunnelStage.DATA_GATHERING
            return True, "High confidence verification - proceed to data gathering", verification_score
        elif verification_score > 0.6:
            # Need additional verification
            return False, "Medium confidence - requesting additional verification sources", verification_score
        elif verification_score > 0.4:
            # Disputed/uncertain
            return False, "Low confidence - disputed reports, investigating further", verification_score
        else:
            return False, "Verification failed - likely false alarm", verification_score
    
    def _calculate_verification_score(self, vd: VerificationData) -> float:
        """Complex verification scoring algorithm"""
        weights = {
            'satellite_imagery': 0.25 if vd.satellite_imagery_available else 0,
            'satellite_damage': vd.satellite_damage_assessment * 0.2,
            'source_correlation': vd.multiple_source_correlation * 0.2,
            'government_confirm': 0.15 if vd.government_confirmation else 0,
            'media_coverage': 0.1 if vd.international_media_coverage else 0,
            'social_verification': vd.social_media_verification_score * 0.05,
            'expert_analysis': 0.1 if vd.expert_analysis_available else 0,
            'pattern_match': vd.historical_disaster_pattern_match * 0.05
        }
        return sum(weights.values())
    
    def process_data_gathering(self, multi_source: MultiSourceData) -> Tuple[bool, str]:
        """Stage 4: Gather data from multiple sources"""
        self.funnel_data['multi_source_data'] = multi_source
        
        # Check data completeness
        data_completeness = self._assess_data_completeness(multi_source)
        
        if data_completeness > 0.7:
            self.current_funnel_stage = FunnelStage.SITUATION_ASSESSMENT
            return True, f"Sufficient data gathered ({data_completeness:.1%} complete)"
        else:
            return False, f"Insufficient data ({data_completeness:.1%} complete) - continuing data collection"
    
    def _assess_data_completeness(self, msd: MultiSourceData) -> float:
        """Assess how complete the multi-source data is"""
        sources = [
            msd.un_ocha_report is not None,
            msd.government_official_statement is not None,
            len(msd.ngo_field_reports) > 0,
            len(msd.media_reports) > 2,
            msd.satellite_analysis is not None,
            len(msd.local_authority_reports) > 0,
            len(msd.humanitarian_partner_intel) > 0
        ]
        return sum(sources) / len(sources)
    
    def process_situation_assessment(self, assessment: SituationAssessment) -> Tuple[bool, str]:
        """Stage 5: Assess the real situation"""
        self.funnel_data['situation_assessment'] = assessment
        
        # Determine if situation warrants humanitarian response
        severity_score = self._calculate_severity_score(assessment)
        
        if severity_score > 80:
            self.current_funnel_stage = FunnelStage.NEEDS_VS_WANTS
            return True, f"Critical situation confirmed (severity: {severity_score}/100)"
        elif severity_score > 60:
            self.current_funnel_stage = FunnelStage.NEEDS_VS_WANTS  
            return True, f"Serious situation requiring response (severity: {severity_score}/100)"
        elif severity_score > 40:
            return False, f"Moderate situation - monitoring but no immediate response (severity: {severity_score}/100)"
        else:
            return False, f"Low severity - no humanitarian response needed (severity: {severity_score}/100)"
    
    def _calculate_severity_score(self, sa: SituationAssessment) -> float:
        """Calculate overall severity score"""
        factors = {
            'life_threat': {'None': 0, 'Low': 20, 'Medium': 40, 'High': 70, 'Critical': 100}[sa.immediate_life_threat_level],
            'casualties': min(sa.confirmed_casualties / 100, 1) * 30,
            'displacement': min(sa.displacement_numbers / 10000, 1) * 20,
            'infrastructure': sa.infrastructure_damage_verified * 15,
            'disease_risk': sa.disease_outbreak_risk * 10,
            'access_difficulty': (1 - sa.water_access_impact) * 5
        }
        return sum(factors.values())
    
    def process_needs_vs_wants(self, analysis: NeedsVsWantsAnalysis) -> Tuple[bool, str]:
        """Stage 6: Process needs vs wants"""
        self.funnel_data['needs_analysis'] = analysis
        
        # Calculate intervention scope
        critical_needs_count = len(analysis.life_saving_needs) + len(analysis.critical_medical_needs)
        total_needs = len(analysis.life_saving_needs) + len(analysis.critical_medical_needs) + len(analysis.basic_survival_needs)
        
        if critical_needs_count > 5:
            self.current_funnel_stage = FunnelStage.LOCAL_SUPPORT_ASSESSMENT
            return True, f"Major intervention required - {critical_needs_count} critical needs identified"
        elif total_needs > 3:
            self.current_funnel_stage = FunnelStage.LOCAL_SUPPORT_ASSESSMENT
            return True, f"Moderate intervention required - {total_needs} total needs"
        else:
            return False, "Minimal needs identified - local capacity may be sufficient"
    
    def process_local_support(self, local_assessment: LocalSupportAssessment) -> Tuple[bool, str]:
        """Stage 7: Assess local support capacity"""
        self.funnel_data['local_support'] = local_assessment
        
        local_capacity_score = self._calculate_local_capacity(local_assessment)
        
        if local_capacity_score < 0.3:
            self.current_funnel_stage = FunnelStage.DIRECTOR_APPROVAL
            return True, f"Local capacity insufficient ({local_capacity_score:.1%}) - external intervention required"
        elif local_capacity_score < 0.6:
            self.current_funnel_stage = FunnelStage.DIRECTOR_APPROVAL  
            return True, f"Local capacity limited ({local_capacity_score:.1%}) - supporting intervention recommended"
        else:
            return False, f"Local capacity adequate ({local_capacity_score:.1%}) - no external intervention needed"
    
    def _calculate_local_capacity(self, lsa: LocalSupportAssessment) -> float:
        """Calculate overall local capacity score"""
        capacities = [
            lsa.government_response_capacity,
            lsa.local_ngo_capacity,
            lsa.community_self_help_capacity,
            lsa.private_sector_involvement,
            lsa.local_medical_capacity,
            lsa.local_food_supply_capacity
        ]
        return sum(capacities) / len(capacities)
    
    def process_director_approval(self, approval_factors: DirectorApprovalFactors) -> Tuple[bool, str]:
        """Stage 8: Director approval process"""
        self.funnel_data['approval_factors'] = approval_factors
        
        approval_score = self._calculate_approval_score(approval_factors)
        
        if approval_score > 75:
            self.current_funnel_stage = FunnelStage.MOBILIZE_CARE
            return True, f"Approved for full intervention (score: {approval_score}/100)"
        elif approval_score > 60:
            self.current_funnel_stage = FunnelStage.MOBILIZE_CARE
            return True, f"Approved for limited intervention (score: {approval_score}/100)" 
        elif approval_score > 40:
            return False, f"Conditional approval - pending additional information (score: {approval_score}/100)"
        else:
            return False, f"Approval denied (score: {approval_score}/100)"
    
    def _calculate_approval_score(self, af: DirectorApprovalFactors) -> float:
        """Calculate director approval score"""
        # This is where organizational politics and constraints come in
        factors = {
            'mandate_alignment': af.organizational_mandate_alignment * 20,
            'success_probability': af.success_probability * 15,
            'funding_available': min(sum(af.funding_source_availability.values()) / af.total_estimated_cost, 1) * 15,
            'security_risk': (1 - af.security_risk_to_staff) * 15,
            'reputation_risk': (1 - af.reputation_risk_assessment) * 10,
            'donor_interest': af.donor_interest_likelihood * 10,
            'media_attention': min(af.media_attention_level / 50, 1) * 5,
            'operational_complexity': (1 - af.operational_complexity) * 5,
            'political_sensitivity': (1 - af.political_sensitivity_score) * 5
        }
        return sum(factors.values())

class ReliefGridFunnelSimulation:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Relief Grid Decision Funnel - Complete Process")
        self.root.geometry("1600x1000")
        self.root.configure(bg='#f8f9fa')
        
        self.decision_engine = ReliefGridDecisionEngine()
        self.current_case = None
        self.simulation_running = False
        
        self.setup_ui()
        
    def setup_ui(self):
        # Title
        title_frame = tk.Frame(self.root, bg='#2c3e50', height=60)
        title_frame.pack(fill=tk.X)
        title_frame.pack_propagate(False)
        
        title = tk.Label(title_frame, text="Relief Grid Decision Funnel - Multi-Step Process Simulation",
                        font=("Arial", 18, "bold"), fg="white", bg="#2c3e50")
        title.pack(expand=True)
        
        # Main container
        main_container = tk.Frame(self.root, bg='#f8f9fa')
        main_container.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Left side - Funnel stages
        left_frame = tk.Frame(main_container, bg='white', relief=tk.RAISED, bd=1)
        left_frame.pack(side=tk.LEFT, fill=tk.Y, padx=(0, 10))
        
        tk.Label(left_frame, text="Decision Funnel Stages", font=("Arial", 14, "bold"),
                bg='white', fg='#2c3e50').pack(pady=10)
        
        self.funnel_frame = tk.Frame(left_frame, bg='white')
        self.funnel_frame.pack(fill=tk.BOTH, expand=True, padx=10)
        
        self.create_funnel_stages()
        
        # Center - Current stage details
        center_frame = tk.Frame(main_container, bg='white', relief=tk.RAISED, bd=1)
        center_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=10)
        
        tk.Label(center_frame, text="Current Stage Analysis", font=("Arial", 14, "bold"),
                bg='white', fg='#2c3e50').pack(pady=10)
        
        self.stage_details = scrolledtext.ScrolledText(center_frame, height=30, width=60,
                                                      font=("Consolas", 10), bg='#f8f9fa',
                                                      fg='#2c3e50')
        self.stage_details.pack(fill=tk.BOTH, expand=True, padx=10, pady=(0, 10))
        
        # Right side - Variables and outcomes
        right_frame = tk.Frame(main_container, bg='white', relief=tk.RAISED, bd=1)
        right_frame.pack(side=tk.RIGHT, fill=tk.Y, padx=(10, 0))
        
        tk.Label(right_frame, text="Variables & Decision Outcomes", font=("Arial", 14, "bold"),
                bg='white', fg='#2c3e50').pack(pady=10)
        
        self.variables_display = scrolledtext.ScrolledText(right_frame, height=30, width=40,
                                                          font=("Consolas", 9), bg='#f8f9fa',
                                                          fg='#2c3e50')
        self.variables_display.pack(fill=tk.BOTH, expand=True, padx=10, pady=(0, 10))
        
        # Bottom control panel
        control_frame = tk.Frame(self.root, bg='#ecf0f1', height=80)
        control_frame.pack(fill=tk.X, side=tk.BOTTOM)
        control_frame.pack_propagate(False)
        
        tk.Button(control_frame, text="Start New Disaster Simulation", 
                 command=self.start_new_simulation, font=("Arial", 12, "bold"),
                 bg='#e74c3c', fg='white', padx=20, pady=10).pack(side=tk.LEFT, padx=20, pady=15)
        
        tk.Button(control_frame, text="Process Next Stage", 
                 command=self.process_next_stage, font=("Arial", 12),
                 bg='#27ae60', fg='white', padx=20, pady=10).pack(side=tk.LEFT, padx=10, pady=15)
        
        self.status_label = tk.Label(control_frame, text="Ready to simulate disaster response decision process",
                                   font=("Arial", 11), bg='#ecf0f1', fg='#2c3e50')
        self.status_label.pack(side=tk.RIGHT, padx=20, pady=15)
        
    def create_funnel_stages(self):
        """Create visual funnel stages"""
        self.stage_labels = {}
        
        for i, stage in enumerate(FunnelStage):
            frame = tk.Frame(self.funnel_frame, bg='#bdc3c7', relief=tk.RAISED, bd=1, height=40)
            frame.pack(fill=tk.X, pady=2)
            frame.pack_propagate(False)
            
            label = tk.Label(frame, text=stage.value, font=("Arial", 10),
                           bg='#bdc3c7', fg='#2c3e50', anchor='w')
            label.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
            
            self.stage_labels[stage] = frame
            
    def start_new_simulation(self):
        """Start a new disaster simulation"""
        self.decision_engine = ReliefGridDecisionEngine()
        
        # Generate realistic disaster
        disaster_types = ["Earthquake", "Flood", "Cyclone", "Disease Outbreak", "Conflict Displacement", "Drought"]
        locations = [
            {"country": "Democratic Republic of Congo", "province": "North Kivu", "district": "Goma", "coordinates": (-1.67, 29.23)},
            {"country": "Bangladesh", "province": "Chittagong", "district": "Cox's Bazar", "coordinates": (21.45, 92.0)},
            {"country": "Yemen", "province": "Hodeidah", "district": "Al Hudaydah", "coordinates": (14.8, 42.95)},
            {"country": "Philippines", "province": "Leyte", "district": "Tacloban", "coordinates": (11.25, 125.0)}
        ]
        
        disaster = DisasterEvent(
            event_id=f"DST_{random.randint(1000, 9999)}",
            disaster_type=random.choice(disaster_types),
            location=random.choice(locations),
            magnitude=random.uniform(4.0, 9.5),
            affected_population=random.randint(1000, 100000),
            infrastructure_damage=random.uniform(0.1, 0.9),
            casualty_estimate=random.randint(10, 5000),
            economic_impact_usd=random.uniform(1e6, 1e9),
            environmental_impact=random.uniform(0.0, 0.8),
            accessibility=random.uniform(0.2, 0.9),
            security_level=random.choice(["Safe", "Moderate Risk", "High Risk", "Extremely Dangerous"]),
            weather_conditions={"visibility": "good", "roads": "passable"},
            time_of_occurrence=datetime.now(),
            duration_estimate_hours=random.randint(2, 72)
        )
        
        self.current_case = disaster
        
        # Process stage 1
        if self.decision_engine.process_disaster_occurrence(disaster):
            self.update_ui()
            self.status_label.config(text=f"Disaster simulation started: {disaster.disaster_type} in {disaster.location['district']}")
        else:
            self.status_label.config(text="Disaster occurred but was not detected - simulation ended")
            
    def process_next_stage(self):
        """Process the next stage in the funnel"""
        if not self.current_case:
            self.status_label.config(text="No active simulation - start a new disaster simulation first")
            return
            
        current_stage = self.decision_engine.current_funnel_stage
        
        try:
            if current_stage == FunnelStage.DISASTER_REPORTED:
                # Generate reports
                reports = self._generate_disaster_reports()
                success, message = self.decision_engine.process_disaster_reporting(reports)
                
            elif current_stage == FunnelStage.VERIFICATION:
                # Generate verification data
                verification_data = self._generate_verification_data()
                success, message, score = self.decision_engine.process_verification(verification_data)
                
            elif current_stage == FunnelStage.DATA_GATHERING:
                # Generate multi-source data
                multi_source = self._generate_multi_source_data()
                success, message = self.decision_engine.process_data_gathering(multi_source)
                
            elif current_stage == FunnelStage.SITUATION_ASSESSMENT:
                # Generate situation assessment
                assessment = self._generate_situation_assessment()
                success, message = self.decision_engine.process_situation_assessment(assessment)
                
            elif current_stage == FunnelStage.NEEDS_VS_WANTS:
                # Generate needs analysis
                needs_analysis = self._generate_needs_analysis()
                success, message = self.decision_engine.process_needs_vs_wants(needs_analysis)
                
            elif current_stage == FunnelStage.LOCAL_SUPPORT_ASSESSMENT:
                # Generate local support assessment
                local_assessment = self._generate_local_assessment()
                success, message = self.decision_engine.process_local_support(local_assessment)
                
            elif current_stage == FunnelStage.DIRECTOR_APPROVAL:
                # Generate approval factors
                approval_factors = self._generate_approval_factors()
                success, message = self.decision_engine.process_director_approval(approval_factors)
                
            else:
                self.status_label.config(text="Simulation complete or stage not implemented")
                return
                
            self.update_ui()
            self.status_label.config(text=f"Stage processed: {message}")
            
            if not success:
                self.status_label.config(text=f"Funnel exit: {message}")
                
        except Exception as e:
            self.status_label.config(text=f"Error processing stage: {str(e)}")
            
    def _generate_disaster_reports(self) -> List[DisasterReport]:
        """Generate realistic disaster reports"""
        reports = []
        num_reports = random.randint(1, 8)
        
        sources = [
            ("Local News", 0.6), ("Social Media", 0.4), ("Field Worker", 0.8),
            ("Government Official", 0.9), ("UN Partner", 0.85), ("NGO", 0.7)
        ]
        
        for i in range(num_reports):
            source_type, reliability = random.choice(sources)
            
            report = DisasterReport(
                report_id=f"RPT_{i:03d}",
                source_type=source_type,
                source_reliability=reliability + random.uniform(-0.2, 0.2),
                reporter_location=f"Location_{i}",
                report_timestamp=datetime.now() - timedelta(hours=random.randint(1, 24)),
                reported_casualties=self.current_case.casualty_estimate + random.randint(-100, 200),
                reported_affected=self.current_case.affected_population + random.randint(-1000, 5000),
                reported_severity=random.choice(["Minor", "Moderate", "Severe", "Catastrophic"]),
                includes_media=random.choice([True, False]),
                language=random.choice(["English", "Local Language"]),
                translation_confidence=random.uniform(0.7, 1.0),
                contains_coordinates=random.choice([True, False]),
                social_media_virality=random.randint(0, 100),
                government_acknowledgment=random.choice([True, False])
            )
            reports.append(report)
            
        return reports
        
    def _generate_verification_data(self) -> VerificationData:
        """Generate verification data"""
        return VerificationData(
            satellite_imagery_available=random.choice([True, False]),
            satellite_damage_assessment=random.uniform(0.0, 1.0),
            multiple_source_correlation=random.uniform(0.3, 0.95),
            government_confirmation=random.choice([True, False]),
            international_media_coverage=random.choice([True, False]),
            social_media_verification_score=random.uniform(0.2, 0.9),
            expert_analysis_available=random.choice([True, False]),
            historical_disaster_pattern_match=random.uniform(0.1, 0.8),
            verification_confidence=random.uniform(0.4, 0.95)
        )
        
    def _generate_multi_source_data(self) -> MultiSourceData:
        """Generate multi-source data"""
        return MultiSourceData(
            un_ocha_report={"status": "preliminary", "confidence": random.uniform(0.6, 0.9)} if random.choice([True, False]) else None,
            government_official_statement={"level": "ministerial", "details": "official response"} if random.choice([True, False]) else None,
            ngo_field_reports=[{"org": f"NGO_{i}", "assessment": "field data"} for i in range(random.randint(0, 5))],
            media_reports=[{"outlet": f"Media_{i}", "credibility": random.uniform(0.3, 0.8)} for i in range(random.randint(1, 8))],
            satellite_analysis={"damage_assessment": random.uniform(0.2, 0.9)} if random.choice([True, False]) else None,
            social_media_sentiment={"positive": 0.2, "negative": 0.6, "neutral": 0.2},
            academic_expert_assessment={"confidence": random.uniform(0.7, 0.95)} if random.choice([True, False]) else None,
            local_authority_reports=[{"authority": f"Local_{i}", "status": "active"} for i in range(random.randint(0, 3))],
            humanitarian_partner_intel=[{"partner": f"Partner_{i}", "intel": "field data"} for i in range(random.randint(1, 4))]
        )
        
    def _generate_situation_assessment(self) -> SituationAssessment:
        """Generate situation assessment"""
        return SituationAssessment(
            confirmed_casualties=self.current_case.casualty_estimate + random.randint(-50, 100),
            confirmed_affected_population=self.current_case.affected_population + random.randint(-500, 2000),
            infrastructure_damage_verified=self.current_case.infrastructure_damage + random.uniform(-0.2, 0.1),
            immediate_life_threat_level=random.choice(["None", "Low", "Medium", "High", "Critical"]),
            displacement_numbers=random.randint(100, 20000),
            access_routes_status={"main_road": "blocked", "secondary": "limited", "air": "available"},
            security_assessment=self.current_case.security_level,
            weather_forecast_impact="deteriorating conditions expected",
            disease_outbreak_risk=random.uniform(0.1, 0.8),
            food_security_impact=random.uniform(0.2, 0.9),
            water_access_impact=random.uniform(0.3, 0.8),
            shelter_needs_assessment=random.randint(500, 10000),
            medical_needs_assessment={"critical": random.randint(10, 200), "serious": random.randint(50, 500)}
        )
        
    def _generate_needs_analysis(self) -> NeedsVsWantsAnalysis:
        """Generate needs vs wants analysis"""
        life_saving = ["Emergency Medical Care", "Clean Water", "Food", "Shelter"]
        critical_medical = ["Trauma Surgery", "Blood Supply", "Antibiotics", "Vaccines"]
        basic_survival = ["Blankets", "Cooking Supplies", "Sanitation", "Communication"]
        
        return NeedsVsWantsAnalysis(
            life_saving_needs=random.sample(life_saving, random.randint(1, len(life_saving))),
            critical_medical_needs=random.sample(critical_medical, random.randint(0, len(critical_medical))),
            basic_survival_needs=random.sample(basic_survival, random.randint(1, len(basic_survival))),
            protection_needs=["Child Protection", "Women's Safety", "Elderly Care"],
            nice_to_have_items=["Educational Materials", "Recreation Supplies"],
            luxury_items=["Non-essential electronics", "Comfort items"],
            needs_priority_ranking=[("Medical Care", 100), ("Water", 95), ("Food", 90), ("Shelter", 85)],
            resource_scarcity_factors={"medical": 0.8, "water": 0.6, "food": 0.4},
            cost_benefit_analysis={"intervention_cost": random.uniform(100000, 5000000), "lives_saved_estimate": random.randint(10, 1000)}
        )
        
    def _generate_local_assessment(self) -> LocalSupportAssessment:
        """Generate local support assessment"""
        return LocalSupportAssessment(
            government_response_capacity=random.uniform(0.1, 0.8),
            local_ngo_capacity=random.uniform(0.2, 0.7),
            community_self_help_capacity=random.uniform(0.3, 0.9),
            private_sector_involvement=random.uniform(0.1, 0.6),
            religious_organization_support=random.uniform(0.4, 0.8),
            diaspora_community_support=random.uniform(0.2, 0.7),
            existing_infrastructure_usability=random.uniform(0.1, 0.6),
            local_medical_capacity=random.uniform(0.2, 0.7),
            local_food_supply_capacity=random.uniform(0.1, 0.8),
            cultural_acceptance_factors={"aid_acceptance": 0.8, "female_workers": 0.6, "foreign_presence": 0.5},
            language_barriers=["Local dialect", "Literacy rates"],
            political_stability_factor=random.uniform(0.3, 0.9)
        )
        
    def _generate_approval_factors(self) -> DirectorApprovalFactors:
        """Generate director approval factors"""
        return DirectorApprovalFactors(
            total_estimated_cost=random.uniform(500000, 10000000),
            funding_source_availability={"emergency_fund": random.uniform(100000, 2000000), 
                                        "donor_pledges": random.uniform(200000, 3000000),
                                        "government_support": random.uniform(0, 1000000)},
            organizational_mandate_alignment=random.uniform(0.6, 1.0),
            political_sensitivity_score=random.uniform(0.1, 0.8),
            media_attention_level=random.randint(10, 90),
            donor_interest_likelihood=random.uniform(0.3, 0.9),
            operational_complexity=random.uniform(0.2, 0.9),
            security_risk_to_staff=random.uniform(0.1, 0.7),
            reputation_risk_assessment=random.uniform(0.1, 0.6),
            competitor_organization_involvement={"MSF": True, "Oxfam": False, "Red_Cross": True},
            success_probability=random.uniform(0.4, 0.9),
            timeline_to_implementation=random.randint(24, 168),  # hours
            staff_availability={"field_workers": random.randint(5, 50), "specialists": random.randint(2, 15)},
            equipment_availability={"vehicles": random.randint(2, 20), "medical": random.randint(1, 10)}
        )
        
    def update_ui(self):
        """Update the user interface"""
        # Update funnel stage highlighting
        for stage, frame in self.stage_labels.items():
            if stage == self.decision_engine.current_funnel_stage:
                frame.configure(bg='#e74c3c')  # Active stage - red
                frame.children['!label'].configure(bg='#e74c3c', fg='white', font=("Arial", 10, "bold"))
            elif stage.value in [s.value for s in list(FunnelStage)[:list(FunnelStage).index(self.decision_engine.current_funnel_stage)]]:
                frame.configure(bg='#27ae60')  # Completed stages - green
                frame.children['!label'].configure(bg='#27ae60', fg='white')
            else:
                frame.configure(bg='#bdc3c7')  # Pending stages - gray
                frame.children['!label'].configure(bg='#bdc3c7', fg='#2c3e50')
                
        # Update stage details
        self.display_current_stage_details()
        
        # Update variables display
        self.display_variables_and_outcomes()
        
    def display_current_stage_details(self):
        """Display detailed analysis of current stage"""
        self.stage_details.delete(1.0, tk.END)
        
        current_stage = self.decision_engine.current_funnel_stage
        funnel_data = self.decision_engine.funnel_data
        
        details = f"""
CURRENT STAGE: {current_stage.value}
{'='*60}

"""
        
        if current_stage == FunnelStage.DISASTER_OCCURS and 'disaster_event' in funnel_data:
            disaster = funnel_data['disaster_event']
            details += f"""DISASTER EVENT DETAILS:
• Type: {disaster.disaster_type}
• Location: {disaster.location['district']}, {disaster.location['province']}, {disaster.location['country']}
• Magnitude: {disaster.magnitude:.1f}/10
• Affected Population: {disaster.affected_population:,}
• Infrastructure Damage: {disaster.infrastructure_damage:.1%}
• Estimated Casualties: {disaster.casualty_estimate:,}
• Economic Impact: ${disaster.economic_impact_usd:,.0f}
• Security Level: {disaster.security_level}
• Accessibility: {disaster.accessibility:.1%}
• Time of Occurrence: {disaster.time_of_occurrence.strftime('%Y-%m-%d %H:%M')}

DETECTION VARIABLES:
• Magnitude Factor: {disaster.magnitude/10:.2f}
• Population Density Factor: {min(disaster.affected_population/10000, 1):.2f}
• Accessibility Factor: {disaster.accessibility:.2f}
• Infrastructure Factor: {1-disaster.infrastructure_damage:.2f}
"""

        elif current_stage == FunnelStage.DISASTER_REPORTED and 'reports' in funnel_data:
            reports = funnel_data['reports']
            details += f"""DISASTER REPORTING ANALYSIS:
• Total Reports Received: {len(reports)}
• High Reliability Sources: {len([r for r in reports if r.source_reliability > 0.7])}
• Viral Social Media Reports: {len([r for r in reports if r.social_media_virality > 50])}
• Government Acknowledged Reports: {len([r for r in reports if r.government_acknowledgment])}

REPORT DETAILS:
"""
            for i, report in enumerate(reports[:5]):  # Show first 5 reports
                details += f"""
Report #{i+1}:
  - Source: {report.source_type} (Reliability: {report.source_reliability:.1%})
  - Reported Casualties: {report.reported_casualties:,}
  - Reported Affected: {report.reported_affected:,}
  - Severity: {report.reported_severity}
  - Social Media Virality: {report.social_media_virality}/100
  - Government Acknowledgment: {report.government_acknowledgment}
  - Contains Media: {report.includes_media}
  - Time: {report.report_timestamp.strftime('%H:%M')}
"""

        elif current_stage == FunnelStage.VERIFICATION and 'verification' in funnel_data:
            verification = funnel_data['verification']
            details += f"""VERIFICATION PROCESS ANALYSIS:
• Satellite Imagery Available: {verification.satellite_imagery_available}
• Satellite Damage Assessment: {verification.satellite_damage_assessment:.1%}
• Multi-Source Correlation: {verification.multiple_source_correlation:.1%}
• Government Confirmation: {verification.government_confirmation}
• International Media Coverage: {verification.international_media_coverage}
• Social Media Verification Score: {verification.social_media_verification_score:.1%}
• Expert Analysis Available: {verification.expert_analysis_available}
• Historical Pattern Match: {verification.historical_disaster_pattern_match:.1%}
• Overall Verification Confidence: {verification.verification_confidence:.1%}

VERIFICATION SCORING BREAKDOWN:
• Satellite Imagery Weight: {0.25 if verification.satellite_imagery_available else 0:.2f}
• Satellite Damage Weight: {verification.satellite_damage_assessment * 0.2:.2f}
• Source Correlation Weight: {verification.multiple_source_correlation * 0.2:.2f}
• Government Confirmation Weight: {0.15 if verification.government_confirmation else 0:.2f}
• Media Coverage Weight: {0.1 if verification.international_media_coverage else 0:.2f}
• Social Verification Weight: {verification.social_media_verification_score * 0.05:.2f}
• Expert Analysis Weight: {0.1 if verification.expert_analysis_available else 0:.2f}
• Pattern Match Weight: {verification.historical_disaster_pattern_match * 0.05:.2f}
"""

        elif current_stage == FunnelStage.DATA_GATHERING and 'multi_source_data' in funnel_data:
            msd = funnel_data['multi_source_data']
            details += f"""MULTI-SOURCE DATA GATHERING:
• UN OCHA Report: {'Available' if msd.un_ocha_report else 'Not Available'}
• Government Statement: {'Available' if msd.government_official_statement else 'Not Available'}
• NGO Field Reports: {len(msd.ngo_field_reports)} reports
• Media Reports: {len(msd.media_reports)} reports
• Satellite Analysis: {'Available' if msd.satellite_analysis else 'Not Available'}
• Local Authority Reports: {len(msd.local_authority_reports)} reports
• Humanitarian Partner Intel: {len(msd.humanitarian_partner_intel)} sources

DATA COMPLETENESS ASSESSMENT:
"""
            sources_available = [
                msd.un_ocha_report is not None,
                msd.government_official_statement is not None,
                len(msd.ngo_field_reports) > 0,
                len(msd.media_reports) > 2,
                msd.satellite_analysis is not None,
                len(msd.local_authority_reports) > 0,
                len(msd.humanitarian_partner_intel) > 0
            ]
            completeness = sum(sources_available) / len(sources_available)
            details += f"• Overall Data Completeness: {completeness:.1%}\n"

        elif current_stage == FunnelStage.SITUATION_ASSESSMENT and 'situation_assessment' in funnel_data:
            sa = funnel_data['situation_assessment']
            details += f"""REAL SITUATION ASSESSMENT:
• Confirmed Casualties: {sa.confirmed_casualties:,}
• Confirmed Affected Population: {sa.confirmed_affected_population:,}
• Infrastructure Damage Verified: {sa.infrastructure_damage_verified:.1%}
• Immediate Life Threat Level: {sa.immediate_life_threat_level}
• Displacement Numbers: {sa.displacement_numbers:,}
• Security Assessment: {sa.security_assessment}
• Disease Outbreak Risk: {sa.disease_outbreak_risk:.1%}
• Food Security Impact: {sa.food_security_impact:.1%}
• Water Access Impact: {sa.water_access_impact:.1%}
• Shelter Needs: {sa.shelter_needs_assessment:,} people

ACCESS ROUTES STATUS:
• Main Road: {sa.access_routes_status.get('main_road', 'Unknown')}
• Secondary Routes: {sa.access_routes_status.get('secondary', 'Unknown')}
• Air Access: {sa.access_routes_status.get('air', 'Unknown')}

MEDICAL NEEDS:
• Critical Cases: {sa.medical_needs_assessment.get('critical', 0):,}
• Serious Cases: {sa.medical_needs_assessment.get('serious', 0):,}
"""

        elif current_stage == FunnelStage.NEEDS_VS_WANTS and 'needs_analysis' in funnel_data:
            na = funnel_data['needs_analysis']
            details += f"""NEEDS VS WANTS ANALYSIS:

LIFE-SAVING NEEDS (Priority 1):
{chr(10).join(f'• {need}' for need in na.life_saving_needs)}

CRITICAL MEDICAL NEEDS (Priority 1):
{chr(10).join(f'• {need}' for need in na.critical_medical_needs)}

BASIC SURVIVAL NEEDS (Priority 2):
{chr(10).join(f'• {need}' for need in na.basic_survival_needs)}

PROTECTION NEEDS (Priority 2):
{chr(10).join(f'• {need}' for need in na.protection_needs)}

NICE-TO-HAVE ITEMS (Priority 3):
{chr(10).join(f'• {item}' for item in na.nice_to_have_items)}

LUXURY ITEMS (Excluded):
{chr(10).join(f'• {item}' for item in na.luxury_items)}

RESOURCE SCARCITY ANALYSIS:
• Medical Resources Scarcity: {na.resource_scarcity_factors.get('medical', 0):.1%}
• Water Resources Scarcity: {na.resource_scarcity_factors.get('water', 0):.1%}
• Food Resources Scarcity: {na.resource_scarcity_factors.get('food', 0):.1%}

COST-BENEFIT ANALYSIS:
• Estimated Intervention Cost: ${na.cost_benefit_analysis.get('intervention_cost', 0):,.0f}
• Estimated Lives Saved: {na.cost_benefit_analysis.get('lives_saved_estimate', 0):,}
• Cost per Life Saved: ${na.cost_benefit_analysis.get('intervention_cost', 0) / max(na.cost_benefit_analysis.get('lives_saved_estimate', 1), 1):,.0f}
"""

        elif current_stage == FunnelStage.LOCAL_SUPPORT_ASSESSMENT and 'local_support' in funnel_data:
            lsa = funnel_data['local_support']
            details += f"""LOCAL SUPPORT CAPACITY ASSESSMENT:

CAPACITY SCORES (0-100%):
• Government Response Capacity: {lsa.government_response_capacity:.1%}
• Local NGO Capacity: {lsa.local_ngo_capacity:.1%}
• Community Self-Help Capacity: {lsa.community_self_help_capacity:.1%}
• Private Sector Involvement: {lsa.private_sector_involvement:.1%}
• Religious Organization Support: {lsa.religious_organization_support:.1%}
• Diaspora Community Support: {lsa.diaspora_community_support:.1%}
• Existing Infrastructure Usability: {lsa.existing_infrastructure_usability:.1%}
• Local Medical Capacity: {lsa.local_medical_capacity:.1%}
• Local Food Supply Capacity: {lsa.local_food_supply_capacity:.1%}

OVERALL LOCAL CAPACITY SCORE: {((lsa.government_response_capacity + lsa.local_ngo_capacity + lsa.community_self_help_capacity + lsa.private_sector_involvement + lsa.local_medical_capacity + lsa.local_food_supply_capacity) / 6):.1%}

CULTURAL & SOCIAL FACTORS:
• Aid Acceptance Rate: {lsa.cultural_acceptance_factors.get('aid_acceptance', 0):.1%}
• Female Worker Acceptance: {lsa.cultural_acceptance_factors.get('female_workers', 0):.1%}
• Foreign Presence Acceptance: {lsa.cultural_acceptance_factors.get('foreign_presence', 0):.1%}
• Political Stability Factor: {lsa.political_stability_factor:.1%}

BARRIERS IDENTIFIED:
{chr(10).join(f'• {barrier}' for barrier in lsa.language_barriers)}
"""

        elif current_stage == FunnelStage.DIRECTOR_APPROVAL and 'approval_factors' in funnel_data:
            af = funnel_data['approval_factors']
            total_funding = sum(af.funding_source_availability.values())
            details += f"""DIRECTOR APPROVAL ANALYSIS:

FINANCIAL FACTORS:
• Total Estimated Cost: ${af.total_estimated_cost:,.0f}
• Available Funding: ${total_funding:,.0f}
• Funding Gap: ${max(af.total_estimated_cost - total_funding, 0):,.0f}
• Funding Ratio: {min(total_funding / af.total_estimated_cost, 1):.1%}

FUNDING SOURCES:
• Emergency Fund: ${af.funding_source_availability.get('emergency_fund', 0):,.0f}
• Donor Pledges: ${af.funding_source_availability.get('donor_pledges', 0):,.0f}
• Government Support: ${af.funding_source_availability.get('government_support', 0):,.0f}

ORGANIZATIONAL FACTORS:
• Mandate Alignment: {af.organizational_mandate_alignment:.1%}
• Success Probability: {af.success_probability:.1%}
• Timeline to Implementation: {af.timeline_to_implementation} hours
• Operational Complexity: {af.operational_complexity:.1%}

RISK FACTORS:
• Security Risk to Staff: {af.security_risk_to_staff:.1%}
• Reputation Risk: {af.reputation_risk_assessment:.1%}
• Political Sensitivity: {af.political_sensitivity_score:.1%}

EXTERNAL FACTORS:
• Media Attention Level: {af.media_attention_level}/100
• Donor Interest Likelihood: {af.donor_interest_likelihood:.1%}

RESOURCE AVAILABILITY:
• Field Workers Available: {af.staff_availability.get('field_workers', 0)}
• Specialists Available: {af.staff_availability.get('specialists', 0)}
• Vehicles Available: {af.equipment_availability.get('vehicles', 0)}
• Medical Equipment Sets: {af.equipment_availability.get('medical', 0)}

COMPETITOR ANALYSIS:
"""
            for org, involved in af.competitor_organization_involvement.items():
                details += f"• {org.replace('_', ' ')}: {'Already Involved' if involved else 'Not Involved'}\n"

        self.stage_details.insert(tk.END, details)
        
    def display_variables_and_outcomes(self):
        """Display all variables and decision outcomes"""
        self.variables_display.delete(1.0, tk.END)
        
        current_stage = self.decision_engine.current_funnel_stage
        
        content = f"""DECISION VARIABLES
{'='*30}

CURRENT STAGE: {current_stage.value}

FUNNEL PROGRESSION:
"""
        
        # Show completed stages
        all_stages = list(FunnelStage)
        current_index = all_stages.index(current_stage)
        
        for i, stage in enumerate(all_stages):
            if i < current_index:
                content += f"✅ {stage.value}\n"
            elif i == current_index:
                content += f"🔄 {stage.value} (ACTIVE)\n"
            else:
                content += f"⏳ {stage.value}\n"
                
        content += f"""
DECISION OUTCOMES:
{'='*20}
"""

        # Show key decision outcomes from each completed stage
        funnel_data = self.decision_engine.funnel_data
        
        if 'disaster_event' in funnel_data:
            disaster = funnel_data['disaster_event']
            content += f"""
DISASTER DETECTED:
• Magnitude: {disaster.magnitude:.1f}/10
• Affected: {disaster.affected_population:,}
• Detection Probability: Calculated
"""

        if 'reports' in funnel_data:
            reports = funnel_data['reports']
            high_rel = len([r for r in reports if r.source_reliability > 0.7])
            content += f"""
REPORTING STAGE:
• Total Reports: {len(reports)}
• High Reliability: {high_rel}
• Outcome: {'Proceed' if high_rel > 0 else 'Need More Data'}
"""

        if 'verification' in funnel_data:
            verification = funnel_data['verification']
            score = self.decision_engine._calculate_verification_score(verification)
            content += f"""
VERIFICATION STAGE:
• Verification Score: {score:.2f}
• Outcome: {'Verified' if score > 0.6 else 'Unverified'}
"""

        if 'situation_assessment' in funnel_data:
            sa = funnel_data['situation_assessment']
            severity_score = self.decision_engine._calculate_severity_score(sa)
            content += f"""
SITUATION ASSESSMENT:
• Severity Score: {severity_score:.0f}/100
• Threat Level: {sa.immediate_life_threat_level}
• Outcome: {'Response Required' if severity_score > 40 else 'Monitor Only'}
"""

        if 'needs_analysis' in funnel_data:
            na = funnel_data['needs_analysis']
            critical_count = len(na.life_saving_needs) + len(na.critical_medical_needs)
            content += f"""
NEEDS ANALYSIS:
• Life-Saving Needs: {len(na.life_saving_needs)}
• Critical Medical: {len(na.critical_medical_needs)}
• Total Critical: {critical_count}
• Outcome: {'Major Response' if critical_count > 5 else 'Limited Response'}
"""

        if 'local_support' in funnel_data:
            lsa = funnel_data['local_support']
            local_capacity = self.decision_engine._calculate_local_capacity(lsa)
            content += f"""
LOCAL CAPACITY:
• Overall Score: {local_capacity:.1%}
• Outcome: {'External Help Needed' if local_capacity < 0.6 else 'Local Capacity Adequate'}
"""

        if 'approval_factors' in funnel_data:
            af = funnel_data['approval_factors']
            approval_score = self.decision_engine._calculate_approval_score(af)
            content += f"""
DIRECTOR APPROVAL:
• Approval Score: {approval_score:.0f}/100
• Funding Available: ${sum(af.funding_source_availability.values()):,.0f}
• Required: ${af.total_estimated_cost:,.0f}
• Outcome: {'Approved' if approval_score > 60 else 'Denied/Pending'}
"""

        content += f"""

NEXT DECISION POINTS:
{'='*20}
"""
        
        if current_stage == FunnelStage.DISASTER_OCCURS:
            content += "• Will this disaster be detected?\n• How quickly will reports come in?\n"
        elif current_stage == FunnelStage.DISASTER_REPORTED:
            content += "• Are there enough credible reports?\n• Do reports correlate?\n"
        elif current_stage == FunnelStage.VERIFICATION:
            content += "• Can we verify through multiple sources?\n• Is satellite imagery available?\n"
        elif current_stage == FunnelStage.DATA_GATHERING:
            content += "• How complete is our data?\n• Are key partners reporting?\n"
        elif current_stage == FunnelStage.SITUATION_ASSESSMENT:
            content += "• What is the real severity?\n• Is immediate response needed?\n"
        elif current_stage == FunnelStage.NEEDS_VS_WANTS:
            content += "• What are the life-saving priorities?\n• What can be delayed?\n"
        elif current_stage == FunnelStage.LOCAL_SUPPORT_ASSESSMENT:
            content += "• Can local capacity handle this?\n• Where are the gaps?\n"
        elif current_stage == FunnelStage.DIRECTOR_APPROVAL:
            content += "• Is funding available?\n• Are risks acceptable?\n• Does it fit our mandate?\n"
        else:
            content += "• Implementation decisions\n• Resource deployment\n"

        self.variables_display.insert(tk.END, content)
        
    def run(self):
        """Run the simulation"""
        self.root.mainloop()

if __name__ == "__main__":
    print("🚀 Starting Relief Grid Multi-Step Decision Funnel Simulation...")
    print("This shows the complete humanitarian response decision-making process")
    print("Every variable and decision point is clearly defined and tracked")
    
    app = ReliefGridFunnelSimulation()
    app.run()