import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function FinancialProjections() {
  const [conversionRate, setConversionRate] = useState(8);
  const [footTraffic, setFootTraffic] = useState(400);
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [dailyOperatingCost, setDailyOperatingCost] = useState(98);
  const [viewMode, setViewMode] = useState('overview');
  const [chocolateCoverageType, setChocolateCoverageType] = useState<'light' | 'medium' | 'full'>('medium');
  const [strawberrySupplier, setStrawberrySupplier] = useState<'bulk' | 'small'>('bulk');
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState(15);
  const [holidayImpact, setHolidayImpact] = useState(60);
  const [seasonalPeak, setSeasonalPeak] = useState(20);
  
  const [selectedEquipment, setSelectedEquipment] = useState({
    'Chocolate tempering machine': { price: 169.99, selected: true, link: 'https://www.amazon.co.uk/Chocolate-Tempering-Commercial-Adjustable-Temperature/dp/B0FG7QQBF6' },
    'Bain-marie backup': { price: 37.40, selected: false, link: 'https://royaldesign.co.uk/chocolate-melter-with-thermostat' },
    'Large storage box': { price: 40.00, selected: true, link: 'https://www.argos.co.uk/product/8958264' },
    'Pop-up gazebo': { price: 29.99, selected: true, link: 'https://www.amazon.co.uk/Gazebo-Panels-Outdoor-Waterproof-Marquee/dp/B09ZF1PJ3Z' },
    'Folding table': { price: 32.99, selected: true, link: 'https://www.amazon.co.uk/Harbour-Housewares-Folding-Trestle-Outdoors/dp/B00OJ0X5CW' },
    'Extension cables': { price: 4.98, selected: true, link: 'https://www.amazon.co.uk/Status-13-4-Way-Extension-Socket/dp/B00HD78QPE' },
    'Chocolate ladle tools': { price: 5.99, selected: true, link: 'https://www.amazon.co.uk/Stainless-Drizzle-Handled-Pouring-Dressings/dp/B0DJQJM1M2' },
    'Branded aprons': { price: 7.99, selected: true, link: 'https://www.amazon.co.uk/FEICANSEN-Personalised-Printed-Customise-Restaurant/dp/B0DHZDK69B' },
    'Thermometer': { price: 7.99, selected: true, link: 'https://www.amazon.co.uk/BOMATA-Waterproof-Thermometer-Cooking-T101/dp/B0CP3WKL7Z' },
    'Cleaning supplies': { price: 21.99, selected: true, link: 'https://www.amazon.co.uk/Cleaning-Perfect-Kitchen-Bathroom-Surfaces/dp/B0DKNRCKX7' },
    'Display stands': { price: 9.98, selected: true, link: 'https://www.amazon.co.uk/Multi-Function-Platter-Server-Kitchen-Crystals/dp/B08KL166GJ' },
    'Menu holder': { price: 11.75, selected: true, link: 'https://www.amazon.co.uk/ROSSHINE-Holders-Display-Acrylic-Restaurant/dp/B0CXCGWK8R' },
    'Menu stand': { price: 21.79, selected: false, link: 'https://www.amazon.co.uk/Adjustable-31-5inch-48-Non-Glare-Heavy-Duty-Activities/dp/B0BXVXYX8J' },
    'LED lights': { price: 7.49, selected: true, link: 'https://www.amazon.co.uk/Battery-Lighting-Strawberry-Christmas-Decorations/dp/B0BMB5S897' },
    'Waste bin': { price: 13.99, selected: true, link: 'https://www.amazon.co.uk/JVL-Plastic-Lidded-Pedal-Waste/dp/B0DW964QGC' },
    'POS system (SumUp)': { price: 24.99, selected: true, link: 'https://www.amazon.co.uk/SumUp-Air-Bundle-contactless-Practical/dp/B09RKK56S3' },
    'Cash box': { price: 18.49, selected: true, link: 'https://www.amazon.co.uk/Cathedral-Products-CBDLBK-12-Inch-Ultimate/dp/B0151BHRSA' },
    'Storage containers': { price: 13.69, selected: true, link: 'https://www.amazon.co.uk/Storage-Plastic-Stackable-Nestable-Container/dp/B09PZ33QLN' },
    'Branding banner': { price: 10.99, selected: true, link: 'https://www.amazon.co.uk/Custom-Personalised-Birthday-Banners-Birthdays/dp/B0DFFGGZZ5' }
  });

  const [monthlyRecurring, setMonthlyRecurring] = useState({
    'Cups (1000pc)': { price: 52.20, selected: true, link: 'https://eventsupplies.co.uk/' },
    'Stickers (1000pc)': { price: 21.95, selected: true, link: '#' },
    'Napkins': { price: 8.99, selected: true, link: 'https://www.amazon.co.uk/Serviettes-Napkins-1-Ply-Cocktail-Disposable/dp/B0C5M29WYX' },
    'Sporks (100pcs)': { price: 3.95, selected: true, link: 'https://www.amazon.co.uk/Nationwide-Paper-Disposable-Plastic-Free-Friendly/dp/B0BVHW7RSD' },
    'Skewers (400pcs)': { price: 4.99, selected: true, link: 'https://www.amazon.co.uk/Deepton-Disposable-Cocktail-Banquet-Catering/dp/B0F4QLF4SH' },
    'Cleaning wipes': { price: 5.25, selected: true, link: 'https://www.amazon.co.uk/Amazon-Antibacterial-Multipurpose-Cleaning-Wipes/dp/B0CFQJPYWX' },
    'Gloves': { price: 5.99, selected: true, link: 'https://www.amazon.co.uk/Black-Nitrile-Disposable-Gloves-Puncture-Resistant/dp/B0CBD14PXD' }
  });

  const products = [
    { name: '2 Strawberries', price: 1.99, cost: 0.23, margin: 88.24, split: 10 },
    { name: '2 Strawberries + Choc', price: 2.99, cost: 0.53, margin: 82.24, split: 45 },
    { name: '10 Strawberries', price: 6.50, cost: 1.17, margin: 82.00, split: 5 },
    { name: '10 Strawberries + Choc', price: 7.50, cost: 2.66, margin: 64.60, split: 40 }
  ];

  const workingHours = { Monday: 4, Tuesday: 4, Wednesday: 6, Thursday: 3, Friday: 6 };

  const STRAWBERRY_WEIGHT = 0.021;
  const chocolateCoverage: { light: number; medium: number; full: number } = { light: 8, medium: 10, full: 15 };
  const strawberrySuppliers: {
    bulk: { price: number; quantity: number; pricePerKg: number; name: string };
    small: { price: number; quantity: number; pricePerKg: number; name: string };
  } = {
    bulk: { price: 44, quantity: 8, pricePerKg: 5.50, name: 'Bulk Supplier (8kg)' },
    small: { price: 12, quantity: 2, pricePerKg: 6.00, name: 'Small Supplier (2kg)' }
  };
  const CHOCOLATE_PRICE_PER_KG = 14.50;

  const equipmentTotal = Object.entries(selectedEquipment).filter(([_, item]) => item.selected).reduce((sum, [_, item]) => sum + item.price, 0);
  const monthlyRecurringTotal = Object.entries(monthlyRecurring).filter(([_, item]) => item.selected).reduce((sum, [_, item]) => sum + item.price, 0);
  const salesPerHour = products.map(p => Math.round(footTraffic * (conversionRate / 100) * (p.split / 100)));
  const weeklyHours = Object.values(workingHours).reduce((a, b) => a + b, 0);
  const monthlySales = products.map((_, i) => {
    const weeklySales = Object.values(workingHours).reduce((total, hours) => total + (salesPerHour[i] * hours), 0);
    return weeklySales * 4.33;
  });

  const monthlyRevenue = products.reduce((sum, p, i) => sum + (monthlySales[i] * p.price), 0);
  const monthlyGrossProfit = products.reduce((sum, p, i) => sum + (monthlySales[i] * (p.price - p.cost)), 0);

  const calculateDailyConsumption = (hours: number) => {
    const dailySalesByProduct = products.map((_, i) => Math.round(salesPerHour[i] * hours));
    const strawberriesNeeded = dailySalesByProduct.reduce((total, sales, i) => {
      const strawberriesPerProduct = products[i].name.includes('10') ? 10 : 2;
      return total + (sales * strawberriesPerProduct);
    }, 0);
    const chocolateNeeded = dailySalesByProduct.reduce((total, sales, i) => {
      if (products[i].name.includes('Choc')) {
        const strawberriesPerProduct = products[i].name.includes('10') ? 10 : 2;
        const gramsPerStrawberry = chocolateCoverage[chocolateCoverageType];
        return total + (sales * strawberriesPerProduct * gramsPerStrawberry);
      }
      return total;
    }, 0);
    return {
      sales: dailySalesByProduct,
      strawberries: strawberriesNeeded,
      strawberriesKg: strawberriesNeeded * STRAWBERRY_WEIGHT,
      chocolate: chocolateNeeded / 1000
    };
  };

  const weeklyInventory = Object.entries(workingHours).map(([day, hours]) => {
    const consumption = calculateDailyConsumption(hours);
    return { day, hours, ...consumption };
  });

  const weeklyStrawberriesKg = weeklyInventory.reduce((sum, day) => sum + day.strawberriesKg, 0);
  const weeklyChocolateKg = weeklyInventory.reduce((sum, day) => sum + day.chocolate, 0);
  const selectedSupplier = strawberrySuppliers[strawberrySupplier];
  
  const dailyStrawberryOrders = weeklyInventory.map(day => {
    const boxesNeeded = Math.ceil(day.strawberriesKg / selectedSupplier.quantity);
    const totalKgOrdered = boxesNeeded * selectedSupplier.quantity;
    const wasteKg = totalKgOrdered - day.strawberriesKg;
    const wastePercentage = (wasteKg / totalKgOrdered) * 100;
    const cost = boxesNeeded * selectedSupplier.price;
    return { day: day.day, neededKg: day.strawberriesKg, boxesOrdered: boxesNeeded, totalKgOrdered, wasteKg, wastePercentage, cost };
  });
  
  const avgDailyStrawberryCost = dailyStrawberryOrders.reduce((sum, order) => sum + order.cost, 0) / dailyStrawberryOrders.length;
  const maxDailyStrawberriesKg = Math.max(...weeklyInventory.map(d => d.strawberriesKg));
  const mondayBoxesNeeded = Math.ceil(maxDailyStrawberriesKg / selectedSupplier.quantity);
  const weeklyChocolateCost = weeklyChocolateKg * CHOCOLATE_PRICE_PER_KG;
  const dailyChocolateCost = weeklyChocolateCost / 5;
  const calculatedDailyIngredientCost = avgDailyStrawberryCost + dailyChocolateCost;

  const workingDaysPerMonth = 22;
  const totalMonthlyOperatingCosts = (dailyOperatingCost * workingDaysPerMonth) + monthlyRecurringTotal;
  const monthlyNetProfit = monthlyGrossProfit - totalMonthlyOperatingCosts;
  const annualNetProfit = monthlyNetProfit * 12;
  const paybackMonths = initialInvestment / monthlyNetProfit;

  const monthlyProjections = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = i;
    let growthFactor = Math.pow(1 + (monthlyGrowthRate / 100), i);
    growthFactor = Math.min(growthFactor, 2.5);
    let seasonalMultiplier = 1;
    if (monthIndex === 11) seasonalMultiplier = holidayImpact / 100;
    else if (monthIndex === 2 || monthIndex === 3) seasonalMultiplier = 0.7;
    else if (monthIndex >= 5 && monthIndex <= 7) seasonalMultiplier = 0.3;
    else if (monthIndex === 0 || monthIndex === 1 || monthIndex === 8 || monthIndex === 9) seasonalMultiplier = 1 + (seasonalPeak / 100);
    const adjustedGrowth = growthFactor * seasonalMultiplier;
    const monthRevenue = monthlyRevenue * adjustedGrowth;
    const monthProfit = monthlyNetProfit * adjustedGrowth;
    const monthCosts = totalMonthlyOperatingCosts;
    return {
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex],
      monthNumber: i + 1,
      revenue: Math.round(monthRevenue),
      grossProfit: Math.round(monthRevenue - monthCosts),
      profit: Math.round(monthProfit),
      costs: Math.round(monthCosts),
      fixedCosts: Math.round(monthlyRecurringTotal),
      variableCosts: Math.round(monthCosts - monthlyRecurringTotal),
      cumulative: i === 0 ? Math.round(monthProfit - initialInvestment) : Math.round((monthProfit * (i + 1)) - initialInvestment + (Array.from({length: i}, (_, j) => {
        const prevGrowth = Math.min(Math.pow(1 + (monthlyGrowthRate / 100), j), 2.5);
        let prevSeasonal = 1;
        if (j === 11) prevSeasonal = holidayImpact / 100;
        else if (j === 2 || j === 3) prevSeasonal = 0.7;
        else if (j >= 5 && j <= 7) prevSeasonal = 0.3;
        else if (j === 0 || j === 1 || j === 8 || j === 9) prevSeasonal = 1 + (seasonalPeak / 100);
        return (monthlyNetProfit * prevGrowth * prevSeasonal);
      }).reduce((a, b) => a + b, 0) - monthProfit)),
      growthFactor: adjustedGrowth,
      isHoliday: monthIndex === 11 || (monthIndex >= 5 && monthIndex <= 7),
      isPeak: monthIndex === 0 || monthIndex === 1 || monthIndex === 8 || monthIndex === 9
    };
  });

  const breakEvenData = Array.from({ length: 30 }, (_, i) => {
    const unitsMultiplier = (i + 1) / 10;
    const units = Math.round(monthlySales.reduce((a, b) => a + b, 0) * unitsMultiplier);
    const fixedCosts = monthlyRecurringTotal + (dailyOperatingCost * 22 * 0.3);
    const variableCostPerUnit = products.reduce((sum, p, idx) => {
      const productUnits = monthlySales[idx] * unitsMultiplier;
      return sum + (productUnits * p.cost);
    }, 0) / units;
    const variableCosts = variableCostPerUnit * units;
    const totalCosts = fixedCosts + variableCosts;
    const avgPrice = products.reduce((sum, p) => sum + (p.price * (p.split / 100)), 0);
    const totalRevenue = avgPrice * units;
    const avc = variableCosts / units;
    const atc = totalCosts / units;
    return {
      units,
      totalRevenue: Math.round(totalRevenue),
      totalCosts: Math.round(totalCosts),
      fixedCosts: Math.round(fixedCosts),
      variableCosts: Math.round(variableCosts),
      avc: avc.toFixed(2),
      atc: atc.toFixed(2),
      mc: variableCostPerUnit.toFixed(2),
      profit: Math.round(totalRevenue - totalCosts),
      isBreakEven: Math.abs(totalRevenue - totalCosts) < (totalRevenue * 0.05)
    };
  });
  
  const breakEvenPoint = breakEvenData.find(d => d.totalRevenue >= d.totalCosts);
  const breakEvenUnits = breakEvenPoint?.units || 0;

  const productMixData = products.map((p, i) => ({ name: p.name, value: monthlySales[i] * p.price, units: Math.round(monthlySales[i]) }));
  const weeklyData = Object.entries(workingHours).map(([day, hours]) => {
    const dayRevenue = products.reduce((sum, p, i) => sum + (salesPerHour[i] * hours * p.price), 0);
    return { day, revenue: Math.round(dayRevenue), hours };
  });

  const scenarios = [
    { name: 'Worst Case', conversion: 2 },
    { name: 'Conservative', conversion: 4 },
    { name: 'Expected', conversion: 8 },
    { name: 'Optimistic', conversion: 12 },
    { name: 'Best Case', conversion: 16 }
  ].map(s => {
    const scenarioSales = products.map(p => Math.round(footTraffic * (s.conversion / 100) * (p.split / 100)));
    const scenarioMonthlySales = scenarioSales.map((sales) => {
      const weeklySales = Object.values(workingHours).reduce((total, hours) => total + (sales * hours), 0);
      return weeklySales * 4.33;
    });
    const scenarioRevenue = products.reduce((sum, p, i) => sum + (scenarioMonthlySales[i] * p.price), 0);
    const scenarioGrossProfit = products.reduce((sum, p, i) => sum + (scenarioMonthlySales[i] * (p.price - p.cost)), 0);
    const scenarioNetProfit = scenarioGrossProfit - totalMonthlyOperatingCosts;
    return {
      name: s.name,
      conversion: s.conversion,
      profit: Math.round(scenarioNetProfit),
      revenue: Math.round(scenarioRevenue),
      payback: (initialInvestment / scenarioNetProfit).toFixed(1)
    };
  });

  const COLORS = ['#ff6b6b', '#ffe66d', '#4ecdc4', '#95e1d3'];

  const toggleEquipment = (name: string) => {
    setSelectedEquipment(prev => ({
      ...prev,
      [name]: { ...prev[name as keyof typeof prev], selected: !prev[name as keyof typeof prev].selected }
    }));
  };

  const toggleRecurring = (name: string) => {
    setMonthlyRecurring(prev => ({
      ...prev,
      [name]: { ...prev[name as keyof typeof prev], selected: !prev[name as keyof typeof prev].selected }
    }));
  };

  return (
    <div className="min-h-screen bg-[#fef6e4]">
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .slide-in { animation: slideIn 0.5s ease-out; }
        input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type="range"]::-webkit-slider-track { background: #e5e5e5; height: 12px; border-radius: 6px; border: 2px solid #000; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 24px; height: 24px; background: #ff6b6b; border: 3px solid #000; border-radius: 50%; cursor: pointer; margin-top: -8px; }
        input[type="range"]::-moz-range-track { background: #e5e5e5; height: 12px; border-radius: 6px; border: 2px solid #000; }
        input[type="range"]::-moz-range-thumb { width: 24px; height: 24px; background: #ff6b6b; border: 3px solid #000; border-radius: 50%; cursor: pointer; }
      `}</style>

      <header className="border-b-4 border-black bg-[#fef6e4] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black">BLOOMSBERRY FINANCIALS</h1>
              <p className="text-sm font-bold text-[#ff6b6b]">Interactive Projections & Analysis</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">Real-time Calculator</p>
              <p className="text-xs">All numbers update live</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['overview', 'equipment', 'inventory', 'projections', 'scenarios'].map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)} className={`border-3 border-black px-4 py-2 font-black text-sm rounded-lg transition-all ${viewMode === mode ? 'bg-[#ff6b6b] text-white' : 'bg-white hover:bg-gray-100'}`}>
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
          <h2 className="text-2xl md:text-3xl font-black mb-6">📊 KEY METRICS</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="border-3 border-black bg-[#ffe66d] p-4 rounded-lg">
              <p className="text-xs font-bold mb-1">Monthly Revenue</p>
              <p className="text-xl md:text-2xl font-black">£{monthlyRevenue.toFixed(0)}</p>
            </div>
            <div className="border-3 border-black bg-[#ff6b6b] text-white p-4 rounded-lg">
              <p className="text-xs font-bold mb-1">Net Profit/Mo</p>
              <p className="text-xl md:text-2xl font-black">£{monthlyNetProfit.toFixed(0)}</p>
            </div>
            <div className="border-3 border-black bg-[#4ecdc4] p-4 rounded-lg">
              <p className="text-xs font-bold mb-1">Annual ARR</p>
              <p className="text-xl md:text-2xl font-black">£{annualNetProfit.toFixed(0)}</p>
            </div>
            <div className="border-3 border-black bg-[#95e1d3] p-4 rounded-lg">
              <p className="text-xs font-bold mb-1">Payback Period</p>
              <p className="text-xl md:text-2xl font-black">{paybackMonths.toFixed(1)}mo</p>
            </div>
            <div className="border-3 border-black bg-white p-4 rounded-lg">
              <p className="text-xs font-bold mb-1">Daily Ingredients</p>
              <p className="text-xl md:text-2xl font-black">£{calculatedDailyIngredientCost.toFixed(0)}</p>
            </div>
          </div>
          <div className="mt-4 border-2 border-black bg-gray-50 p-3 rounded-lg text-xs">
            <p className="font-bold">💡 Ingredient Breakdown: £{avgDailyStrawberryCost.toFixed(2)} strawberries + £{dailyChocolateCost.toFixed(2)} chocolate = £{calculatedDailyIngredientCost.toFixed(2)}/day</p>
          </div>
        </section>

        {viewMode === 'overview' && (
          <>
            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">🎛️ ADJUST ASSUMPTIONS</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-black text-lg">Conversion Rate</label>
                    <span className="text-2xl font-black text-[#ff6b6b]">{conversionRate}%</span>
                  </div>
                  <input type="range" min="2" max="20" value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))} className="w-full cursor-pointer" />
                  <p className="text-xs mt-1 text-gray-600">How many people buy per 100 passersby</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-black text-lg">Foot Traffic per Hour</label>
                    <span className="text-2xl font-black text-[#ff6b6b]">{footTraffic}</span>
                  </div>
                  <input type="range" min="100" max="800" step="50" value={footTraffic} onChange={(e) => setFootTraffic(Number(e.target.value))} className="w-full cursor-pointer" />
                  <p className="text-xs mt-1 text-gray-600">People passing Gordon Square per hour</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-black text-lg">Daily Operating Cost</label>
                    <span className="text-2xl font-black text-[#ff6b6b]">£{dailyOperatingCost}</span>
                  </div>
                  <input type="range" min="50" max="200" step="5" value={dailyOperatingCost} onChange={(e) => setDailyOperatingCost(Number(e.target.value))} className="w-full cursor-pointer" />
                  <p className="text-xs mt-1 text-gray-600">Ingredients, transport, rent, contingency</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-black text-lg">Initial Investment</label>
                    <span className="text-2xl font-black text-[#ff6b6b]">£{initialInvestment}</span>
                  </div>
                  <input type="range" min="1000" max="20000" step="500" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} className="w-full cursor-pointer" />
                  <p className="text-xs mt-1 text-gray-600">Total startup capital needed</p>
                </div>
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
                <h2 className="text-xl md:text-2xl font-black mb-4">🥧 REVENUE MIX</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={productMixData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
                      {productMixData.map((_, index) => (
                        
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#000" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => typeof value === 'number' ? `£${value.toFixed(0)}` : value} />
                  </PieChart>
                </ResponsiveContainer>
              </section>

              <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
                <h2 className="text-xl md:text-2xl font-black mb-4">📅 WEEKLY REVENUE</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                    <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
                    <Tooltip formatter={(value: any) => typeof value === 'number' ? `£${value}` : value} contentStyle={{ border: '3px solid #000', borderRadius: '8px', fontWeight: 'bold' }} />
                    <Bar dataKey="revenue" fill="#ff6b6b" stroke="#000" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </section>
            </div>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in overflow-x-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-6">🍓 PRODUCT PERFORMANCE</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-3 border-black">
                    <th className="text-left py-3 font-black">Product</th>
                    <th className="text-right py-3 font-black">Price</th>
                    <th className="text-right py-3 font-black">Cost</th>
                    <th className="text-right py-3 font-black">Margin</th>
                    <th className="text-right py-3 font-black">Mix %</th>
                    <th className="text-right py-3 font-black">Units/Mo</th>
                    <th className="text-right py-3 font-black">Revenue</th>
                    <th className="text-right py-3 font-black">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={i} className="border-b-2 border-gray-200">
                      <td className="py-3 font-bold">{p.name}</td>
                      <td className="text-right">£{p.price.toFixed(2)}</td>
                      <td className="text-right">£{p.cost.toFixed(2)}</td>
                      <td className="text-right font-bold text-green-600">{p.margin.toFixed(1)}%</td>
                      <td className="text-right">{p.split}%</td>
                      <td className="text-right font-bold">{Math.round(monthlySales[i])}</td>
                      <td className="text-right font-bold text-[#ff6b6b]">£{(monthlySales[i] * p.price).toFixed(0)}</td>
                      <td className="text-right font-bold text-green-600">£{(monthlySales[i] * (p.price - p.cost)).toFixed(0)}</td>
                    </tr>
                  ))}
                  <tr className="border-t-3 border-black font-black">
                    <td className="py-3" colSpan={5}>TOTAL</td>
                    <td className="text-right">{Math.round(monthlySales.reduce((a,b) => a+b, 0))}</td>
                    <td className="text-right text-[#ff6b6b]">£{monthlyRevenue.toFixed(0)}</td>
                    <td className="text-right text-green-600">£{monthlyGrossProfit.toFixed(0)}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        )}

        {viewMode === 'equipment' && (
          <>
            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black">🛠️ ONE-TIME EQUIPMENT</h2>
                <div className="text-right">
                  <p className="text-sm font-bold">Selected Total</p>
                  <p className="text-3xl font-black text-[#ff6b6b]">£{equipmentTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {Object.entries(selectedEquipment).map(([name, item]) => (
                  <div key={name} className={`border-3 border-black p-4 rounded-lg transition-all ${item.selected ? 'bg-[#ffe66d]' : 'bg-gray-100'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <div onClick={() => toggleEquipment(name)} className={`w-6 h-6 border-2 border-black rounded cursor-pointer flex-shrink-0 ${item.selected ? 'bg-black' : 'bg-white'} flex items-center justify-center`}>
                          {item.selected && <span className="text-white text-sm">✓</span>}
                        </div>
                        <span className="font-bold text-sm">{name}</span>
                      </div>
                      <span className="font-black ml-2">£{item.price.toFixed(2)}</span>
                    </div>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:text-blue-800 underline block truncate">
                      View Product →
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black">📦 MONTHLY RECURRING</h2>
                <div className="text-right">
                  <p className="text-sm font-bold">Monthly Total</p>
                  <p className="text-3xl font-black text-[#ff6b6b]">£{monthlyRecurringTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {Object.entries(monthlyRecurring).map(([name, item]) => (
                  <div key={name} className={`border-3 border-black p-4 rounded-lg transition-all ${item.selected ? 'bg-[#4ecdc4]' : 'bg-gray-100'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <div onClick={() => toggleRecurring(name)} className={`w-6 h-6 border-2 border-black rounded cursor-pointer flex-shrink-0 ${item.selected ? 'bg-black' : 'bg-white'} flex items-center justify-center`}>
                          {item.selected && <span className="text-white text-sm">✓</span>}
                        </div>
                        <span className="font-bold text-sm">{name}</span>
                      </div>
                      <span className="font-black ml-2">£{item.price.toFixed(2)}</span>
                    </div>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:text-blue-800 underline block truncate">
                      {item.link !== '#' ? 'View Product →' : 'Custom Order'}
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">💰 COST BREAKDOWN</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 border-3 border-black bg-[#ffe66d] rounded-lg">
                  <span className="font-bold">Equipment (One-time)</span>
                  <span className="font-black text-xl">£{equipmentTotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center p-4 border-2 border-black rounded-lg">
                  <span className="font-bold">Initial Investment Total</span>
                  <span className="font-black text-xl">£{initialInvestment.toFixed(0)}</span>
                </div>
                <div className="border-t-3 border-black my-4"></div>
                <div className="flex justify-between items-center p-4 border-2 border-black rounded-lg">
                  <span className="font-bold">Daily Operating (£{dailyOperatingCost} × 22 days)</span>
                  <span className="font-black text-xl text-red-600">£{(dailyOperatingCost * 22).toFixed(0)}/mo</span>
                </div>
                <div className="flex justify-between items-center p-4 border-2 border-black rounded-lg">
                  <span className="font-bold">Monthly Recurring Costs</span>
                  <span className="font-black text-xl text-red-600">£{monthlyRecurringTotal.toFixed(0)}/mo</span>
                </div>
                <div className="border-t-3 border-black pt-3"></div>
                <div className="flex justify-between items-center p-4 border-3 border-black bg-[#ff6b6b] text-white rounded-lg">
                  <span className="font-black text-lg">TOTAL MONTHLY COSTS</span>
                  <span className="font-black text-2xl">£{totalMonthlyOperatingCosts.toFixed(0)}</span>
                </div>
              </div>
            </section>
          </>
        )}

        {viewMode === 'inventory' && (
          <>
            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">📦 DAILY INGREDIENT REQUIREMENTS</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border-3 border-black bg-[#ffe66d] p-4 rounded-lg">
                  <h3 className="font-black mb-3">🍫 Chocolate Coverage Type</h3>
                  <div className="space-y-2">
                    {['light', 'medium', 'full'].map(type => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" checked={chocolateCoverageType === type} onChange={() => setChocolateCoverageType(type as 'light' | 'medium' | 'full')} className="w-5 h-5" />
                        <span className="font-bold capitalize">{type} ({chocolateCoverage[type as 'light' | 'medium' | 'full']}g/strawberry)</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="border-3 border-black bg-[#ff6b6b] text-white p-4 rounded-lg">
                  <h3 className="font-black mb-3">🍓 Strawberry Supplier</h3>
                  <div className="space-y-2">
                    {Object.entries(strawberrySuppliers).map(([key, supplier]) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" checked={strawberrySupplier === key} onChange={() => setStrawberrySupplier(key as 'bulk' | 'small')} className="w-5 h-5" />
                        <span className="font-bold">{supplier.name} - £{supplier.pricePerKg}/kg</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border-3 border-black bg-white p-4 rounded-lg">
                  <p className="text-sm font-bold mb-2">Avg Daily Strawberry Cost</p>
                  <p className="text-3xl font-black text-[#ff6b6b]">£{avgDailyStrawberryCost.toFixed(2)}</p>
                  <p className="text-xs mt-2">Varies by day: £{Math.min(...dailyStrawberryOrders.map(o => o.cost)).toFixed(2)} - £{Math.max(...dailyStrawberryOrders.map(o => o.cost)).toFixed(2)}</p>
                </div>
                <div className="border-3 border-black bg-white p-4 rounded-lg">
                  <p className="text-sm font-bold mb-2">Daily Chocolate Cost</p>
                  <p className="text-3xl font-black text-[#4ecdc4]">£{dailyChocolateCost.toFixed(2)}</p>
                  <p className="text-xs mt-2">{weeklyChocolateKg.toFixed(2)}kg weekly ÷ 5 days</p>
                </div>
                <div className="border-3 border-black bg-[#ffe66d] p-4 rounded-lg">
                  <p className="text-sm font-bold mb-2">Total Ingredient Cost</p>
                  <p className="text-3xl font-black">£{calculatedDailyIngredientCost.toFixed(2)}</p>
                  <p className="text-xs mt-2">Average per working day</p>
                </div>
              </div>
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in overflow-x-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-6">📅 DAILY ORDERING PLAN (Waste-Optimized)</h2>
              <p className="text-sm mb-4 text-gray-600">Exact boxes needed per day to minimize waste while meeting demand</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-3 border-black">
                    <th className="text-left py-3 font-black">Day</th>
                    <th className="text-right py-3 font-black">Needed (kg)</th>
                    <th className="text-right py-3 font-black">Boxes</th>
                    <th className="text-right py-3 font-black">Ordered (kg)</th>
                    <th className="text-right py-3 font-black">Waste (kg)</th>
                    <th className="text-right py-3 font-black">Waste %</th>
                    <th className="text-right py-3 font-black">Cost</th>
                    <th className="text-right py-3 font-black">Chocolate (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyStrawberryOrders.map((order, i) => {
                    const dayChoc = weeklyInventory.find(d => d.day === order.day)?.chocolate || 0;
                    return (
                      <tr key={i} className="border-b-2 border-gray-200">
                        <td className="py-3 font-bold">{order.day}</td>
                        <td className="text-right">{order.neededKg.toFixed(2)}kg</td>
                        <td className="text-right font-bold text-[#ff6b6b]">{order.boxesOrdered}</td>
                        <td className="text-right">{order.totalKgOrdered.toFixed(2)}kg</td>
                        <td className="text-right text-red-600">{order.wasteKg.toFixed(2)}kg</td>
                        <td className="text-right">
                          <span className={`font-bold ${order.wastePercentage > 20 ? 'text-red-600' : order.wastePercentage > 10 ? 'text-orange-600' : 'text-green-600'}`}>
                            {order.wastePercentage.toFixed(1)}%
                          </span>
                        </td>
                        <td className="text-right font-bold">£{order.cost.toFixed(2)}</td>
                        <td className="text-right">{dayChoc.toFixed(2)}kg</td>
                      </tr>
                    );
                  })}
                  <tr className="border-t-3 border-black font-black">
                    <td className="py-3">WEEKLY TOTAL</td>
                    <td className="text-right">{weeklyStrawberriesKg.toFixed(2)}kg</td>
                    <td className="text-right">{dailyStrawberryOrders.reduce((s, o) => s + o.boxesOrdered, 0)}</td>
                    <td className="text-right">{dailyStrawberryOrders.reduce((s, o) => s + o.totalKgOrdered, 0).toFixed(2)}kg</td>
                    <td className="text-right text-red-600">{dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0).toFixed(2)}kg</td>
                    <td className="text-right">
                      {((dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) / dailyStrawberryOrders.reduce((s, o) => s + o.totalKgOrdered, 0)) * 100).toFixed(1)}%
                    </td>
                    <td className="text-right text-[#ff6b6b]">£{dailyStrawberryOrders.reduce((s, o) => s + o.cost, 0).toFixed(2)}</td>
                    <td className="text-right">{weeklyChocolateKg.toFixed(2)}kg</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="border-2 border-black bg-[#ffe66d] p-3 rounded-lg">
                  <p className="text-xs font-bold mb-1">Avg Waste per Day</p>
                  <p className="text-xl font-black">{((dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) / dailyStrawberryOrders.length)).toFixed(2)}kg</p>
                </div>
                <div className="border-2 border-black bg-[#ff6b6b] text-white p-3 rounded-lg">
                  <p className="text-xs font-bold mb-1">Weekly Waste Cost</p>
                  <p className="text-xl font-black">£{(dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) * selectedSupplier.pricePerKg).toFixed(2)}</p>
                </div>
                <div className="border-2 border-black bg-[#4ecdc4] p-3 rounded-lg">
                  <p className="text-xs font-bold mb-1">Efficiency Rate</p>
                  <p className="text-xl font-black">{(100 - ((dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) / dailyStrawberryOrders.reduce((s, o) => s + o.totalKgOrdered, 0)) * 100)).toFixed(1)}%</p>
                </div>
              </div>
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">💰 SUPPLIER COST & WASTE COMPARISON</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(strawberrySuppliers).map(([key, supplier]) => {
                  const supplierDailyOrders = weeklyInventory.map(day => {
                    const boxesNeeded = Math.ceil(day.strawberriesKg / supplier.quantity);
                    const totalKgOrdered = boxesNeeded * supplier.quantity;
                    const wasteKg = totalKgOrdered - day.strawberriesKg;
                    const cost = boxesNeeded * supplier.price;
                    return { boxesNeeded, totalKgOrdered, wasteKg, cost };
                  });
                  const totalWaste = supplierDailyOrders.reduce((s, o) => s + o.wasteKg, 0);
                  const totalOrdered = supplierDailyOrders.reduce((s, o) => s + o.totalKgOrdered, 0);
                  const wastePercentage = (totalWaste / totalOrdered) * 100;
                  const weeklyCost = supplierDailyOrders.reduce((s, o) => s + o.cost, 0);
                  const monthlyCost = weeklyCost * 4.33;
                  const isSelected = key === strawberrySupplier;
                  return (
                    <div key={key} className={`border-3 border-black p-6 rounded-lg ${isSelected ? 'bg-[#ffe66d]' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black">{supplier.name}</h3>
                        {isSelected && <span className="bg-black text-white px-3 py-1 rounded text-xs font-black">SELECTED</span>}
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between"><span className="font-bold">Price per box:</span><span className="font-black">£{supplier.price}</span></div>
                        <div className="flex justify-between"><span className="font-bold">Box size:</span><span className="font-black">{supplier.quantity}kg</span></div>
                        <div className="flex justify-between"><span className="font-bold">Price per kg:</span><span className="font-black">£{supplier.pricePerKg.toFixed(2)}/kg</span></div>
                        <div className="border-t-2 border-black pt-3 mt-3">
                          <div className="flex justify-between mb-2"><span className="font-bold">Weekly boxes:</span><span className="font-black text-[#ff6b6b]">{supplierDailyOrders.reduce((s, o) => s + o.boxesNeeded, 0)}</span></div>
                          <div className="flex justify-between mb-2"><span className="font-bold">Weekly cost:</span><span className="font-black">£{weeklyCost.toFixed(2)}</span></div>
                          <div className="flex justify-between mb-2"><span className="font-bold">Monthly cost:</span><span className="font-black text-xl">£{monthlyCost.toFixed(2)}</span></div>
                          <div className="flex justify-between"><span className="font-bold">Weekly waste:</span><span className={`font-black ${wastePercentage > 20 ? 'text-red-600' : wastePercentage > 10 ? 'text-orange-600' : 'text-green-600'}`}>{wastePercentage.toFixed(1)}% ({totalWaste.toFixed(2)}kg)</span></div>
                        </div>
                        {!isSelected && (
                          <div className="mt-4 border-2 border-black bg-white p-3 rounded-lg">
                            <p className="text-sm font-bold mb-2">vs Selected Supplier:</p>
                            <p className={`text-sm ${weeklyCost < (dailyStrawberryOrders.reduce((s, o) => s + o.cost, 0)) ? 'text-green-600' : 'text-red-600'}`}>
                              <strong>Cost:</strong> {weeklyCost < (dailyStrawberryOrders.reduce((s, o) => s + o.cost, 0)) ? 'Save' : 'Pay'} £{Math.abs((dailyStrawberryOrders.reduce((s, o) => s + o.cost, 0)) - weeklyCost).toFixed(2)}/week
                            </p>
                            <p className={`text-sm ${wastePercentage < ((dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) / dailyStrawberryOrders.reduce((s, o) => s + o.totalKgOrdered, 0)) * 100) ? 'text-green-600' : 'text-red-600'}`}>
                              <strong>Waste:</strong> {wastePercentage < ((dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) / dailyStrawberryOrders.reduce((s, o) => s + o.totalKgOrdered, 0)) * 100) ? 'Less' : 'More'} waste by {Math.abs(wastePercentage - ((dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) / dailyStrawberryOrders.reduce((s, o) => s + o.totalKgOrdered, 0)) * 100)).toFixed(1)}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="border-4 border-black bg-[#ff6b6b] text-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">📋 RECOMMENDED ORDERING SCHEDULE</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-3 border-black bg-white text-black p-6 rounded-lg">
                  <h3 className="text-xl font-black mb-4">🍓 STRAWBERRIES (Perishable)</h3>
                  <div className="space-y-3">
                    <div className="border-2 border-black bg-[#ffe66d] p-3 rounded-lg">
                      <p className="font-black text-lg mb-1">DAILY ORDER</p>
                      <p className="text-sm">Order fresh every morning before 6am</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="font-bold">Order quantity:</span><span className="font-black">{dailyStrawberryOrders.find(o => o.day === 'Monday')?.boxesOrdered || mondayBoxesNeeded} boxes</span></div>
                      <div className="flex justify-between"><span className="font-bold">Total weight:</span><span className="font-black">{((dailyStrawberryOrders.find(o => o.day === 'Monday')?.boxesOrdered || mondayBoxesNeeded) * selectedSupplier.quantity).toFixed(1)}kg</span></div>
                      <div className="flex justify-between"><span className="font-bold">Avg daily cost:</span><span className="font-black text-lg">£{avgDailyStrawberryCost.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span className="font-bold">Avg waste/day:</span><span className="font-black text-red-600">{(dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) / dailyStrawberryOrders.length).toFixed(2)}kg</span></div>
                    </div>
                    <div className="border-t-2 border-black pt-3 mt-3">
                      <p className="font-bold text-xs mb-2">⚠️ ORDERING TIPS:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Call supplier by 5:30am</li>
                        <li>• Collect from Covent Garden by 6am</li>
                        <li>• Inspect quality on collection</li>
                        <li>• Keep refrigerated until use</li>
                        <li>• Use within same day</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-3 border-black bg-white text-black p-6 rounded-lg">
                  <h3 className="text-xl font-black mb-4">🍫 CHOCOLATE (Non-Perishable)</h3>
                  <div className="space-y-3">
                    <div className="border-2 border-black bg-[#4ecdc4] p-3 rounded-lg">
                      <p className="font-black text-lg mb-1">WEEKLY ORDER</p>
                      <p className="text-sm">Order once per week on Monday</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="font-bold">Order quantity:</span><span className="font-black">{Math.ceil(weeklyChocolateKg)}kg</span></div>
                      <div className="flex justify-between"><span className="font-bold">Coverage type:</span><span className="font-black capitalize">{chocolateCoverageType}</span></div>
                      <div className="flex justify-between"><span className="font-bold">Weekly cost:</span><span className="font-black text-lg">£{weeklyChocolateCost.toFixed(2)}</span></div>
                    </div>
                    <div className="border-t-2 border-black pt-3 mt-3">
                      <p className="font-bold text-xs mb-2">⚠️ STORAGE TIPS:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Store at 15-18°C</li>
                        <li>• Keep away from moisture</li>
                        <li>• Use airtight containers</li>
                        <li>• Check for bloom before use</li>
                        <li>• Shelf life: 12-18 months</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">⚠️ WASTE ANALYSIS & OPTIMIZATION</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="border-3 border-black bg-[#ff6b6b] text-white p-4 rounded-lg">
                  <h4 className="font-black mb-3">Current Waste Rate</h4>
                  <p className="text-4xl font-black mb-2">{((dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) / dailyStrawberryOrders.reduce((s, o) => s + o.totalKgOrdered, 0)) * 100).toFixed(1)}%</p>
                  <p className="text-sm">{dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0).toFixed(2)}kg wasted per week</p>
                  <p className="text-xs mt-2 opacity-80">Cost: £{(dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) * selectedSupplier.pricePerKg).toFixed(2)}/week</p>
                </div>
                <div className="border-3 border-black bg-[#ffe66d] p-4 rounded-lg">
                  <h4 className="font-black mb-3">Efficiency Score</h4>
                  <p className="text-4xl font-black mb-2">{(100 - ((dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) / dailyStrawberryOrders.reduce((s, o) => s + o.totalKgOrdered, 0)) * 100)).toFixed(1)}%</p>
                  <p className="text-sm">Using {selectedSupplier.name}</p>
                  <p className="text-xs mt-2 text-gray-600">{selectedSupplier.quantity}kg boxes</p>
                </div>
                <div className="border-3 border-black bg-[#4ecdc4] p-4 rounded-lg">
                  <h4 className="font-black mb-3">Worst Day Waste</h4>
                  <p className="text-4xl font-black mb-2">{Math.max(...dailyStrawberryOrders.map(o => o.wastePercentage)).toFixed(1)}%</p>
                  <p className="text-sm">{dailyStrawberryOrders.find(o => o.wastePercentage === Math.max(...dailyStrawberryOrders.map(o => o.wastePercentage)))?.day}</p>
                  <p className="text-xs mt-2 text-gray-600">{dailyStrawberryOrders.find(o => o.wastePercentage === Math.max(...dailyStrawberryOrders.map(o => o.wastePercentage)))?.wasteKg.toFixed(2)}kg waste</p>
                </div>
              </div>
              <div className="border-3 border-black bg-gray-50 p-4 rounded-lg">
                <h4 className="font-black mb-3">💡 Optimization Tips</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-600 font-black">✓</span><span><strong>Current Strategy:</strong> Ordering exact boxes per day minimizes waste to {((dailyStrawberryOrders.reduce((s, o) => s + o.wasteKg, 0) / dailyStrawberryOrders.reduce((s, o) => s + o.totalKgOrdered, 0)) * 100).toFixed(1)}%</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-black">→</span><span><strong>Box Size Impact:</strong> {selectedSupplier.name} ({selectedSupplier.quantity}kg) vs alternative ({strawberrySuppliers[strawberrySupplier === 'bulk' ? 'small' : 'bulk'].quantity}kg)</span></li>
                  <li className="flex items-start gap-2"><span className="text-orange-600 font-black">⚠</span><span><strong>Buffer Recommendation:</strong> Add 15-20% buffer for quality rejects and bruising</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-600 font-black">!</span><span><strong>Spoilage Risk:</strong> All strawberries must be used same day. No carryover to next day.</span></li>
                </ul>
              </div>
            </section>
          </>
        )}

        {viewMode === 'projections' && (
          <>
            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">📈 PROJECTION ASSUMPTIONS</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-black text-lg">Monthly Growth Rate</label>
                    <span className="text-2xl font-black text-[#ff6b6b]">{monthlyGrowthRate}%</span>
                  </div>
                  <input type="range" min="0" max="30" step="1" value={monthlyGrowthRate} onChange={(e) => setMonthlyGrowthRate(Number(e.target.value))} className="w-full cursor-pointer" />
                  <p className="text-xs mt-1 text-gray-600">Expected month-over-month sales growth (compounds, capped at 2.5x)</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-black text-lg">Holiday Sales Impact</label>
                    <span className="text-2xl font-black text-[#ff6b6b]">{holidayImpact}%</span>
                  </div>
                  <input type="range" min="20" max="100" step="5" value={holidayImpact} onChange={(e) => setHolidayImpact(Number(e.target.value))} className="w-full cursor-pointer" />
                  <p className="text-xs mt-1 text-gray-600">% of normal sales during major breaks (December, Summer). Campus is mostly empty.</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-black text-lg">Peak Term Boost</label>
                    <span className="text-2xl font-black text-[#ff6b6b]">{seasonalPeak}%</span>
                  </div>
                  <input type="range" min="0" max="50" step="5" value={seasonalPeak} onChange={(e) => setSeasonalPeak(Number(e.target.value))} className="w-full cursor-pointer" />
                  <p className="text-xs mt-1 text-gray-600">Sales boost during peak terms (Jan, Feb, Sep, Oct) when campus is busiest</p>
                </div>
              </div>
              <div className="mt-6 border-3 border-black bg-gray-50 p-4 rounded-lg">
                <h4 className="font-black mb-3">📅 UCL Term Schedule Impact</h4>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-green-100 border-2 border-green-600 p-3 rounded-lg">
                    <p className="font-black mb-1">Peak Months</p>
                    <p className="text-xs mb-2">Jan, Feb, Sep, Oct</p>
                    <p className="font-bold text-green-600">+{seasonalPeak}% sales</p>
                  </div>
                  <div className="bg-orange-100 border-2 border-orange-600 p-3 rounded-lg">
                    <p className="font-black mb-1">Easter Break</p>
                    <p className="text-xs mb-2">Mar, Apr</p>
                    <p className="font-bold text-orange-600">-30% sales</p>
                  </div>
                  <div className="bg-red-100 border-2 border-red-600 p-3 rounded-lg">
                    <p className="font-black mb-1">Major Breaks</p>
                    <p className="text-xs mb-2">Jun-Aug, Dec</p>
                    <p className="font-bold text-red-600">{holidayImpact}% sales</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">📊 12-MONTH REVENUE & PROFIT</h2>
              <p className="text-sm mb-4 text-gray-600">Realistic projections accounting for {monthlyGrowthRate}% monthly growth, UCL term schedule, and seasonal patterns</p>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyProjections}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ecdc4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4ecdc4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <Tooltip 
                    formatter={(value: any) => {
                      if (typeof value === 'number') {
                        return `£${value.toLocaleString()}`;
                      }
                      return value;
                    }}
                    contentStyle={{ border: '3px solid #000', borderRadius: '8px', fontWeight: 'bold' }}
                    labelFormatter={(label) => {
                      const month = monthlyProjections.find(m => m.month === label);
                      if (month) {
                        return `${label} ${month.isHoliday ? '🏖️ Holiday' : month.isPeak ? '🔥 Peak' : ''}`;
                      }
                      return label;
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#ff6b6b" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                  <Area type="monotone" dataKey="profit" stroke="#4ecdc4" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" name="Profit" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 grid md:grid-cols-4 gap-3">
                <div className="border-2 border-black bg-green-100 p-3 rounded-lg">
                  <p className="text-xs font-bold mb-1">Best Month</p>
                  <p className="font-black text-lg">{monthlyProjections.reduce((best, m) => m.revenue > best.revenue ? m : best).month}</p>
                  <p className="text-xs">£{monthlyProjections.reduce((best, m) => m.revenue > best.revenue ? m : best).revenue.toLocaleString()}</p>
                </div>
                <div className="border-2 border-black bg-red-100 p-3 rounded-lg">
                  <p className="text-xs font-bold mb-1">Worst Month</p>
                  <p className="font-black text-lg">{monthlyProjections.reduce((worst, m) => m.revenue < worst.revenue ? m : worst).month}</p>
                  <p className="text-xs">£{monthlyProjections.reduce((worst, m) => m.revenue < worst.revenue ? m : worst).revenue.toLocaleString()}</p>
                </div>
                <div className="border-2 border-black bg-blue-100 p-3 rounded-lg">
                  <p className="text-xs font-bold mb-1">Year Total</p>
                  <p className="font-black text-lg">£{monthlyProjections.reduce((sum, m) => sum + m.revenue, 0).toLocaleString()}</p>
                  <p className="text-xs">Projected Revenue</p>
                </div>
                <div className="border-2 border-black bg-yellow-100 p-3 rounded-lg">
                  <p className="text-xs font-bold mb-1">Year Profit</p>
                  <p className="font-black text-lg">£{monthlyProjections.reduce((sum, m) => sum + m.profit, 0).toLocaleString()}</p>
                  <p className="text-xs">After all costs</p>
                </div>
              </div>
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">⚖️ BREAK-EVEN ANALYSIS</h2>
              <p className="text-sm mb-4 text-gray-600">Economic analysis showing Total Revenue (TR), Total Cost (TC), and break-even point</p>
              <ResponsiveContainer width="100%" height={450}>
                <LineChart data={breakEvenData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                  <XAxis dataKey="units" tick={{ fontSize: 12, fontWeight: 'bold' }} label={{ value: 'Units Sold (Monthly)', position: 'insideBottom', offset: -5, style: { fontWeight: 'bold' } }} />
                  <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} label={{ value: '£ (Pounds)', angle: -90, position: 'insideLeft', style: { fontWeight: 'bold' } }} />
                  <Tooltip 
                    formatter={(value: any) => typeof value === 'number' ? `£${value.toLocaleString()}` : value}
                    contentStyle={{ border: '3px solid #000', borderRadius: '8px', fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="totalRevenue" stroke="#4ecdc4" strokeWidth={4} dot={false} name="Total Revenue (TR)" />
                  <Line type="monotone" dataKey="totalCosts" stroke="#ff6b6b" strokeWidth={4} dot={false} name="Total Cost (TC)" />
                  <Line type="monotone" dataKey="fixedCosts" stroke="#ffe66d" strokeWidth={3} strokeDasharray="5 5" dot={false} name="Fixed Costs" />
                  <Line type="monotone" dataKey="variableCosts" stroke="#95e1d3" strokeWidth={3} strokeDasharray="5 5" dot={false} name="Variable Costs" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 grid md:grid-cols-4 gap-4">
                <div className="border-3 border-black bg-[#4ecdc4] p-4 rounded-lg">
                  <p className="text-sm font-bold mb-2">Break-Even Point</p>
                  <p className="text-3xl font-black mb-1">{breakEvenUnits}</p>
                  <p className="text-xs">units/month</p>
                  <p className="text-xs mt-2 font-bold">£{breakEvenPoint?.totalRevenue.toLocaleString()} revenue</p>
                </div>
                <div className="border-3 border-black bg-[#ffe66d] p-4 rounded-lg">
                  <p className="text-sm font-bold mb-2">Current Volume</p>
                  <p className="text-3xl font-black mb-1">{Math.round(monthlySales.reduce((a,b) => a+b, 0))}</p>
                  <p className="text-xs">units/month</p>
                  <p className="text-xs mt-2 font-bold">
                    {Math.round(monthlySales.reduce((a,b) => a+b, 0)) > breakEvenUnits ? 
                      `${(((Math.round(monthlySales.reduce((a,b) => a+b, 0)) - breakEvenUnits) / breakEvenUnits) * 100).toFixed(0)}% above break-even` :
                      `${((breakEvenUnits - Math.round(monthlySales.reduce((a,b) => a+b, 0))) / breakEvenUnits * 100).toFixed(0)}% below break-even`
                    }
                  </p>
                </div>
                <div className="border-3 border-black bg-white p-4 rounded-lg">
                  <p className="text-sm font-bold mb-2">Fixed Costs</p>
                  <p className="text-3xl font-black mb-1">£{breakEvenData[0].fixedCosts.toLocaleString()}</p>
                  <p className="text-xs">per month</p>
                  <p className="text-xs mt-2 font-bold text-gray-600">Rent, recurring, base transport</p>
                </div>
                <div className="border-3 border-black bg-white p-4 rounded-lg">
                  <p className="text-sm font-bold mb-2">Variable Cost/Unit</p>
                  <p className="text-3xl font-black mb-1">£{breakEvenData[10]?.avc || '0'}</p>
                  <p className="text-xs">average</p>
                  <p className="text-xs mt-2 font-bold text-gray-600">Strawberries + chocolate</p>
                </div>
              </div>
              <div className="mt-6 border-3 border-black bg-gray-50 p-4 rounded-lg">
                <h4 className="font-black mb-3">📊 Cost Structure Analysis</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-bold mb-2">Fixed Costs (Monthly):</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Cups, stickers, packaging: £{monthlyRecurringTotal.toFixed(0)}</li>
                      <li>• Base rent & transport: £{(dailyOperatingCost * 22 * 0.3).toFixed(0)}</li>
                      <li>• <strong>Total Fixed: £{breakEvenData[0].fixedCosts.toLocaleString()}/month</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold mb-2">Variable Costs (Per Unit):</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Strawberries: ~£{(avgDailyStrawberryCost / 22 / (monthlySales.reduce((a,b) => a+b, 0) / 22)).toFixed(2)}/unit</li>
                      <li>• Chocolate: ~£{(dailyChocolateCost / (monthlySales.reduce((a,b) => a+b, 0) / 22)).toFixed(2)}/unit</li>
                      <li>• Other variable: ~£{((dailyOperatingCost * 0.7) / (monthlySales.reduce((a,b) => a+b, 0) / 22)).toFixed(2)}/unit</li>
                      <li>• <strong>Avg Variable: £{breakEvenData[10]?.avc || '0'}/unit</strong></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-black">
                  <p className="font-black mb-2">💡 Key Insight:</p>
                  <p className="text-sm">
                    {Math.round(monthlySales.reduce((a,b) => a+b, 0)) > breakEvenUnits ? (
                      <>You need to sell <strong>{breakEvenUnits} units/month</strong> to break even. Currently projecting <strong>{Math.round(monthlySales.reduce((a,b) => a+b, 0))} units</strong>, putting you <strong className="text-green-600">{(((Math.round(monthlySales.reduce((a,b) => a+b, 0)) - breakEvenUnits) / breakEvenUnits) * 100).toFixed(0)}% above break-even</strong>. Every unit beyond break-even is pure profit margin.</>
                    ) : (
                      <>You need <strong>{breakEvenUnits} units/month</strong> to break even. Currently projecting <strong>{Math.round(monthlySales.reduce((a,b) => a+b, 0))} units</strong>. Need <strong className="text-red-600">{breakEvenUnits - Math.round(monthlySales.reduce((a,b) => a+b, 0))} more units</strong> to hit break-even.</>
                    )}
                  </p>
                </div>
              </div>
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">💵 CUMULATIVE PROFIT (After £{initialInvestment.toLocaleString()} Investment)</h2>
              <p className="text-sm mb-4 text-gray-600">Shows when you recover your initial investment and start making net positive returns</p>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyProjections}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <Tooltip 
                    formatter={(value: any) => {
                      if (typeof value === 'number') {
                        return `£${value.toLocaleString()}`;
                      }
                      return value;
                    }}
                    contentStyle={{ border: '3px solid #000', borderRadius: '8px', fontWeight: 'bold' }}
                    labelFormatter={(label) => {
                      const month = monthlyProjections.find(m => m.month === label);
                      if (month) {
                        return `${label} ${month.cumulative >= 0 ? '✓ Profitable' : '⏳ Building'}`;
                      }
                      return label;
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cumulative" 
                    stroke="#ffe66d" 
                    strokeWidth={4}
                    dot={(props: any) => {
                      const { cx, cy, payload } = props;
                      return <circle cx={cx} cy={cy} r={6} fill={payload.cumulative >= 0 ? '#4ecdc4' : '#ff6b6b'} stroke="#000" strokeWidth={2} />;
                    }}
                    activeDot={{ r: 8 }}
                    name="Cumulative Profit"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 border-3 border-black bg-[#ffe66d] p-4 rounded-lg">
                <p className="font-black text-lg mb-2">
                  {monthlyProjections.find(m => m.cumulative >= 0) ? (
                    <>Break-Even: {monthlyProjections.find(m => m.cumulative >= 0)?.month}</>
                  ) : (
                    <>Break-Even: Not in Year 1</>
                  )}
                </p>
                <p className="text-sm">
                  {monthlyProjections.find(m => m.cumulative >= 0) ? (
                    <>After {monthlyProjections.findIndex(m => m.cumulative >= 0) + 1} months, you've recovered your £{initialInvestment.toLocaleString()} investment and start making pure profit. By end of Year 1: <strong className="text-green-600">£{monthlyProjections[11].cumulative.toLocaleString()}</strong> net profit.</>
                  ) : (
                    <>With current assumptions, you need to adjust growth rate or reduce costs to break even within Year 1. Year 1 ending: <strong className="text-red-600">£{monthlyProjections[11].cumulative.toLocaleString()}</strong> (still negative).</>
                  )}
                </p>
              </div>
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in overflow-x-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-6">📋 DETAILED MONTHLY BREAKDOWN</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-3 border-black">
                    <th className="text-left py-3 font-black">Month</th>
                    <th className="text-right py-3 font-black">Revenue</th>
                    <th className="text-right py-3 font-black">Costs</th>
                    <th className="text-right py-3 font-black">Profit</th>
                    <th className="text-right py-3 font-black">Cumulative</th>
                    <th className="text-right py-3 font-black">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyProjections.map((month, i) => (
                    <tr key={i} className={`border-b-2 ${month.cumulative >= 0 ? 'bg-green-50' : ''} ${month.isHoliday ? 'bg-red-50' : ''} ${month.isPeak ? 'bg-blue-50' : ''}`}>
                      <td className="py-3 font-bold">{month.month} {month.isHoliday && '🏖️'} {month.isPeak && '🔥'}</td>
                      <td className="text-right font-bold text-[#ff6b6b]">£{month.revenue.toLocaleString()}</td>
                      <td className="text-right text-red-600">£{month.costs.toLocaleString()}</td>
                      <td className="text-right font-bold text-green-600">£{month.profit.toLocaleString()}</td>
                      <td className={`text-right font-black ${month.cumulative >= 0 ? 'text-green-600' : 'text-red-600'}`}>£{month.cumulative.toLocaleString()}</td>
                      <td className="text-right text-xs">
                        {month.isHoliday ? (
                          <span className="bg-red-200 px-2 py-1 rounded font-bold">Holiday</span>
                        ) : month.isPeak ? (
                          <span className="bg-blue-200 px-2 py-1 rounded font-bold">Peak</span>
                        ) : (
                          <span className="bg-gray-200 px-2 py-1 rounded font-bold">Normal</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-3 border-black font-black">
                    <td className="py-3">YEAR 1 TOTAL</td>
                    <td className="text-right text-[#ff6b6b]">£{monthlyProjections.reduce((sum, m) => sum + m.revenue, 0).toLocaleString()}</td>
                    <td className="text-right text-red-600">£{(monthlyProjections.reduce((sum, m) => sum + m.costs, 0)).toLocaleString()}</td>
                    <td className="text-right text-green-600">£{monthlyProjections.reduce((sum, m) => sum + m.profit, 0).toLocaleString()}</td>
                    <td className="text-right">£{monthlyProjections[11].cumulative.toLocaleString()}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 border-3 border-black bg-[#ffe66d] p-4 rounded-lg">
                <p className="font-black text-lg mb-2">📊 Year 1 Summary</p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-bold">Total Revenue:</p>
                    <p className="text-xl font-black">£{monthlyProjections.reduce((sum, m) => sum + m.revenue, 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-bold">Total Profit:</p>
                    <p className="text-xl font-black text-green-600">£{monthlyProjections.reduce((sum, m) => sum + m.profit, 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-bold">Net After Investment:</p>
                    <p className="text-xl font-black">£{monthlyProjections[11].cumulative.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-4 border-black bg-[#ff6b6b] text-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">🎯 MILESTONE PROJECTIONS</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border-3 border-black bg-white text-black p-4 rounded-lg">
                  <p className="text-sm font-bold mb-2">Break Even (Investment)</p>
                  <p className="text-3xl font-black mb-2">{monthlyProjections.find(m => m.cumulative >= 0)?.month || 'Month 12+'}</p>
                  <p className="text-xs">Recover £{initialInvestment.toLocaleString()} investment</p>
                  <div className="mt-3 pt-3 border-t-2 border-black">
                    <p className="text-xs font-bold">
                      {monthlyProjections.find(m => m.cumulative >= 0) ? 
                        `Cumulative: £${monthlyProjections.find(m => m.cumulative >= 0)?.cumulative.toLocaleString()}` :
                        'Not reached in Year 1'
                      }
                    </p>
                  </div>
                </div>
                <div className="border-3 border-black bg-[#ffe66d] text-black p-4 rounded-lg">
                  <p className="text-sm font-bold mb-2">Peak Month</p>
                  <p className="text-3xl font-black mb-2">{monthlyProjections.reduce((best, m) => m.revenue > best.revenue ? m : best).month}</p>
                  <p className="text-xs">£{monthlyProjections.reduce((best, m) => m.revenue > best.revenue ? m : best).revenue.toLocaleString()} revenue</p>
                  <div className="mt-3 pt-3 border-t-2 border-black">
                    <p className="text-xs font-bold">
                      {monthlyProjections.reduce((best, m) => m.revenue > best.revenue ? m : best).isPeak ? '🔥 Peak term month' : 'Normal operations'}
                    </p>
                  </div>
                </div>
                <div className="border-3 border-black bg-[#4ecdc4] text-black p-4 rounded-lg">
                  <p className="text-sm font-bold mb-2">Toughest Month</p>
                  <p className="text-3xl font-black mb-2">{monthlyProjections.reduce((worst, m) => m.revenue < worst.revenue ? m : worst).month}</p>
                  <p className="text-xs">£{monthlyProjections.reduce((worst, m) => m.revenue < worst.revenue ? m : worst).revenue.toLocaleString()} revenue</p>
                  <div className="mt-3 pt-3 border-t-2 border-black">
                    <p className="text-xs font-bold">
                      {monthlyProjections.reduce((worst, m) => m.revenue < worst.revenue ? m : worst).isHoliday ? '🏖️ Holiday period' : 'Need to boost sales'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-3 border-black bg-white text-black p-4 rounded-lg">
                <h4 className="font-black mb-3">📈 Realistic Growth Assumptions</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-600 font-black">✓</span><span><strong>Base Growth:</strong> {monthlyGrowthRate}% monthly (compounds, capped at 2.5x to stay realistic)</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-600 font-black">↓</span><span><strong>Summer Break:</strong> Jun-Aug sales drop to {holidayImpact}% (campus mostly empty)</span></li>
                  <li className="flex items-start gap-2"><span className="text-orange-600 font-black">↓</span><span><strong>Easter Break:</strong> Mar-Apr sales drop to 70% (many students away)</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-black">↑</span><span><strong>Peak Terms:</strong> Jan, Feb, Sep, Oct get +{seasonalPeak}% boost (busy campus)</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-600 font-black">→</span><span><strong>Result:</strong> Year 1 total of £{monthlyProjections.reduce((sum, m) => sum + m.revenue, 0).toLocaleString()} revenue, £{monthlyProjections.reduce((sum, m) => sum + m.profit, 0).toLocaleString()} profit</span></li>
                </ul>
              </div>
            </section>
          </>
        )}

        {viewMode === 'scenarios' && (
          <>
            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">🎲 SCENARIO ANALYSIS</h2>
              <p className="text-sm mb-4 text-gray-600">Compare different conversion rates</p>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={scenarios}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <Tooltip 
                    formatter={(value: any) => typeof value === 'number' ? `£${value.toLocaleString()}` : value}
                    contentStyle={{ border: '3px solid #000', borderRadius: '8px', fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#ff6b6b" stroke="#000" strokeWidth={2} />
                  <Bar dataKey="profit" fill="#4ecdc4" stroke="#000" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in overflow-x-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-6">📋 SCENARIO BREAKDOWN</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-3 border-black">
                    <th className="text-left py-3 font-black">Scenario</th>
                    <th className="text-right py-3 font-black">Conversion</th>
                    <th className="text-right py-3 font-black">Monthly Revenue</th>
                    <th className="text-right py-3 font-black">Monthly Profit</th>
                    <th className="text-right py-3 font-black">Annual Profit</th>
                    <th className="text-right py-3 font-black">Payback</th>
                    <th className="text-right py-3 font-black">Viability</th>
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((s, i) => {
                    const isViable = s.profit > 2000;
                    const isCurrent = s.conversion === conversionRate;
                    return (
                      <tr key={i} className={`border-b-2 ${isCurrent ? 'bg-yellow-100' : ''}`}>
                        <td className="py-3 font-bold">{s.name}</td>
                        <td className="text-right">{s.conversion}%</td>
                        <td className="text-right font-bold text-[#ff6b6b]">£{s.revenue.toLocaleString()}</td>
                        <td className="text-right font-bold text-green-600">£{s.profit.toLocaleString()}</td>
                        <td className="text-right font-bold">£{(s.profit * 12).toLocaleString()}</td>
                        <td className="text-right">{s.payback}mo</td>
                        <td className="text-right">
                          <span className={`px-2 py-1 rounded font-black text-xs ${isViable ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {isViable ? '✓ VIABLE' : '✗ RISKY'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {scenarios.find(s => s.conversion === conversionRate) && (
                <div className="mt-4 border-3 border-black bg-[#ffe66d] p-4 rounded-lg">
                  <p className="font-black">Currently viewing: {scenarios.find(s => s.conversion === conversionRate)?.name}</p>
                </div>
              )}
            </section>

            <section className="border-4 border-black bg-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">🎯 SENSITIVITY ANALYSIS</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-black text-lg mb-4">Key Assumptions Impact</h3>
                  <div className="space-y-3">
                    <div className="border-2 border-black p-4 rounded-lg">
                      <p className="font-bold mb-2">Conversion Rate: {conversionRate}%</p>
                      <div className="text-sm space-y-1">
                        <p>-2%: £{(monthlyNetProfit - (monthlyRevenue * 0.02)).toFixed(0)} profit/mo</p>
                        <p className="font-bold text-green-600">Current: £{monthlyNetProfit.toFixed(0)} profit/mo</p>
                        <p>+2%: £{(monthlyNetProfit + (monthlyRevenue * 0.02)).toFixed(0)} profit/mo</p>
                      </div>
                    </div>
                    <div className="border-2 border-black p-4 rounded-lg">
                      <p className="font-bold mb-2">Daily Operating Cost: £{dailyOperatingCost}</p>
                      <div className="text-sm space-y-1">
                        <p>-£20: £{(monthlyNetProfit + (20 * 22)).toFixed(0)} profit/mo</p>
                        <p className="font-bold text-green-600">Current: £{monthlyNetProfit.toFixed(0)} profit/mo</p>
                        <p>+£20: £{(monthlyNetProfit - (20 * 22)).toFixed(0)} profit/mo</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-lg mb-4">Break-Even Analysis</h3>
                  <div className="space-y-3">
                    <div className="border-3 border-black bg-[#ff6b6b] text-white p-4 rounded-lg">
                      <p className="text-sm font-bold mb-2">Minimum Conversion for Profit</p>
                      <p className="text-3xl font-black">{((totalMonthlyOperatingCosts / (weeklyHours * 4.33 * footTraffic * 3.5)) * 100).toFixed(1)}%</p>
                      <p className="text-xs mt-2">Below this, you lose money</p>
                    </div>
                    <div className="border-3 border-black bg-[#4ecdc4] p-4 rounded-lg">
                      <p className="text-sm font-bold mb-2">Target for £5k/mo Profit</p>
                      <p className="text-3xl font-black">{(((totalMonthlyOperatingCosts + 5000) / (weeklyHours * 4.33 * footTraffic * 3.5)) * 100).toFixed(1)}%</p>
                      <p className="text-xs mt-2">Conversion needed for strong returns</p>
                    </div>
                    <div className="border-3 border-black bg-[#ffe66d] p-4 rounded-lg">
                      <p className="text-sm font-bold mb-2">Current Cushion</p>
                      <p className="text-3xl font-black">{(conversionRate - ((totalMonthlyOperatingCosts / (weeklyHours * 4.33 * footTraffic * 3.5)) * 100)).toFixed(1)}%</p>
                      <p className="text-xs mt-2">Safety margin above break-even</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-4 border-black bg-[#ff6b6b] text-white p-6 rounded-xl slide-in">
              <h2 className="text-2xl md:text-3xl font-black mb-6">⚠️ RISK ASSESSMENT</h2>
              <div className="space-y-4">
                <div className="border-3 border-black bg-white text-black p-4 rounded-lg">
                  <h4 className="font-black mb-2">✓ Low Risk Indicators</h4>
                  <ul className="text-sm space-y-1">
                    {paybackMonths < 6 && <li>• Fast payback period ({paybackMonths.toFixed(1)} months)</li>}
                    {monthlyNetProfit > 3000 && <li>• Strong monthly profit (£{monthlyNetProfit.toFixed(0)})</li>}
                    {(monthlyNetProfit/monthlyRevenue) > 0.3 && <li>• Healthy profit margin ({((monthlyNetProfit/monthlyRevenue)*100).toFixed(1)}%)</li>}
                    {conversionRate >= 6 && <li>• Realistic conversion rate ({conversionRate}%)</li>}
                  </ul>
                </div>
                <div className="border-3 border-black bg-white text-black p-4 rounded-lg">
                  <h4 className="font-black mb-2 text-orange-600">⚠ Medium Risk Indicators</h4>
                  <ul className="text-sm space-y-1">
                    {paybackMonths >= 6 && paybackMonths < 12 && <li>• Moderate payback period ({paybackMonths.toFixed(1)} months)</li>}
                    {monthlyNetProfit >= 1500 && monthlyNetProfit <= 3000 && <li>• Modest monthly profit (£{monthlyNetProfit.toFixed(0)})</li>}
                    {conversionRate < 6 && conversionRate >= 4 && <li>• Conservative conversion ({conversionRate}%)</li>}
                  </ul>
                </div>
                <div className="border-3 border-black bg-white text-black p-4 rounded-lg">
                  <h4 className="font-black mb-2 text-red-600">✗ High Risk Indicators</h4>
                  <ul className="text-sm space-y-1">
                    {paybackMonths >= 12 && <li>• Long payback period ({paybackMonths.toFixed(1)} months)</li>}
                    {monthlyNetProfit < 1500 && <li>• Low monthly profit (£{monthlyNetProfit.toFixed(0)})</li>}
                    {conversionRate < 4 && <li>• Very low conversion rate ({conversionRate}%)</li>}
                    {(totalMonthlyOperatingCosts / monthlyRevenue) > 0.8 && <li>• High cost ratio</li>}
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
}