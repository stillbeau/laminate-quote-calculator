import React, { useState } from 'react';
import { Plus, Trash2, Calculator, FileText } from 'lucide-react';

const LaminateQuoteCalculator = () => {
  const sheetSizes = [
    { width: 30, length: 144, name: '30x144' },
    { width: 60, length: 144, name: '60x144' },
    { width: 50, length: 120, name: '50x120' },
    { width: 48, length: 96, name: '48x96' },
    { width: 30, length: 96, name: '30x96' },
    { width: 36, length: 144, name: '36x144' },
    { width: 48, length: 120, name: '48x120' },
    { width: 48, length: 144, name: '48x144' },
    { width: 60, length: 96, name: '60x96' },
    { width: 60, length: 120, name: '60x120' },
    { width: 60, length: 108, name: '60x108' },
    { width: 36, length: 96, name: '36x96' },
    { width: 30, length: 48, name: '30x48' },
    { width: 30, length: 72, name: '30x72' }
  ];

  const stockMaterials = {
    'Wilsonart': [
      { id: '1849', name: 'Luna Frost', finish: '35', level: '4' },
      { id: '1874', name: 'Winter Carnival', finish: '52', level: '2' },
      { id: '1879', name: 'Trinidad Lapidus', finish: '35', level: '4' },
      { id: '1887', name: 'Benjamin Grey', finish: '22', level: '2' },
      { id: '4170', name: 'Beige Pampas', finish: '60', level: '1' },
      { id: '4551', name: 'Blackstar Granite', finish: '01', level: '2' },
      { id: '4925', name: 'Calcutta Marble', finish: '07', level: '2' },
      { id: '4926', name: 'Black Alicante', finish: '07', level: '2' },
      { id: '4981', name: 'Calacatta Oro', finish: '38', level: '1' },
      { id: '4987', name: 'Leche Vesta', finish: '07', level: '2' },
      { id: '5005', name: 'Sierra Cascade', finish: '38', level: '1' },
      { id: '5025', name: 'Glacier Quartzite', finish: '22', level: '2' },
      { id: '5042', name: 'Calacatta Lincoln', finish: '07', level: '2' },
      { id: '5043', name: 'Beach Walk', finish: '15', level: '2' },
      { id: '5044', name: 'Ice Mist', finish: '60', level: '1' },
      { id: '5045', name: 'Lake Shore', finish: '15', level: '2' },
      { id: '5046', name: 'Carrara Luni', finish: '15', level: '2' },
      { id: '5047', name: 'Terrena Soapstone', finish: '38', level: '1' },
      { id: '5059', name: 'Midnight Carnival', finish: '15', level: '2' },
      { id: '5061', name: 'Borghini Marble', finish: '15', level: '2' },
      { id: '5062', name: 'Pietra Viva', finish: '38', level: '1' },
      { id: '5063', name: 'Roca Bosco', finish: '22', level: '2' },
      { id: '5064', name: 'Midtown Concrete', finish: '60', level: '1' },
      { id: '5065', name: 'Lisola', finish: '22', level: '2' },
      { id: '4971', name: 'Bronzite', finish: '52', level: '2' },
      { id: '4955', name: 'Cafe Di Pesco', finish: '22', level: '2' },
      { id: '5068', name: 'Crystal Quartzite', finish: '22', level: '2' },
      { id: '1877', name: 'Autumn Carnival', finish: '52', level: '2' },
      { id: '354', name: 'Designer White', finish: '60', level: '1' }
    ],
    'Formica': [
      { id: '6697', name: 'Argento Romano', finish: '46', level: '2' },
      { id: '3690', name: 'Basalt Slate', finish: '58', level: '1' },
      { id: '6001', name: 'Bianco Antico', finish: '58', level: '1' },
      { id: '9527', name: 'Black Shalestone', finish: '34', level: '2' },
      { id: '6696', name: 'Carrara Bianco', finish: '58', level: '1' }
    ],
    'Arborite': [
      { id: '1000', name: 'Arabescato Marble', finish: 'VL', level: '4' },
      { id: '395', name: 'Arctic Ice', finish: 'VL', level: '2' },
      { id: '394', name: 'Arctic Snow', finish: 'VL', level: '2' },
      { id: '421', name: 'Arctic Spirit', finish: 'VL', level: '2' },
      { id: '1022', name: 'Bianco Statuario', finish: 'VL', level: '4' }
    ]
  };

  const [areas, setAreas] = useState([{
    id: 1,
    name: 'Kitchen',
    materialBrand: 'Wilsonart',
    materialId: '354',
    pieces: [{ id: 1, length: '', width: '22.5' }],
    countertopStyle: 'A',
    edgeLength: '',
    edgeType: 'square-wrap',
    applianceEdge: '',
    splashLength: '',
    depthType: 'narrow',
    needsTemplate: false,
    needsInstallation: false,
    needsBuildup: true,
    seams: '0'
  }]);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    project: ''
  });

  const pricing = {
    linearFootage: {
      narrow: { '1': 32.80, '2': 34.32, '3': 36.25, '4': 38.51 },
      wide: { '1': 48.83, '2': 50.72, '3': 55.65, '4': 57.21 }
    },
    edges: {
      'square-wrap': 0.00,
      'bevel-edge': 0.00,
      'maple-bevel-edge': 40.60,
      'self-edge': 8.75,
      '180-underwrap': 0.00,
      'angle-wrap': 0.00,
      'k-nose': 0.00,
      'post-form': 0.00,
      'appliance': 0.00
    },
    splash: { 'side': 22.30 },
    extras: {
      template: 106.72,
      installation: 18.33,
      seam: 107.91, // Mitred Seam charge
      buildup: 3.50, // Full Build-Up Standard 5/8" K-3 (no discount applied)
      nonStandardDepth: 5.75
    }
  };

  const addArea = () => {
    const newId = Math.max(...areas.map(a => a.id)) + 1;
    setAreas([...areas, {
      id: newId,
      name: `Area ${newId}`,
      materialBrand: 'Wilsonart',
      materialId: '354',
      pieces: [{ id: 1, length: '', width: '22.5' }],
      countertopStyle: 'A',
      edgeLength: '',
      edgeType: 'square-wrap',
      applianceEdge: '',
      splashLength: '',
      depthType: 'narrow',
      needsTemplate: false,
      needsInstallation: false,
      needsBuildup: true,
      seams: '0'
    }]);
  };

  const removeArea = (id) => {
    setAreas(areas.filter(area => area.id !== id));
  };

  const updateArea = (id, field, value) => {
    setAreas(areas.map(area => 
      area.id === id ? { ...area, [field]: value } : area
    ));
  };

  const addPiece = (areaId) => {
    setAreas(areas.map(area => {
      if (area.id === areaId) {
        const newPieceId = Math.max(...area.pieces.map(p => p.id), 0) + 1;
        return {
          ...area,
          pieces: [...area.pieces, { id: newPieceId, length: '', width: '22.5' }]
        };
      }
      return area;
    }));
  };

  const removePiece = (areaId, pieceId) => {
    setAreas(areas.map(area => {
      if (area.id === areaId) {
        return {
          ...area,
          pieces: area.pieces.filter(piece => piece.id !== pieceId)
        };
      }
      return area;
    }));
  };

  const updatePiece = (areaId, pieceId, field, value) => {
    setAreas(areas.map(area => {
      if (area.id === areaId) {
        return {
          ...area,
          pieces: area.pieces.map(piece => 
            piece.id === pieceId ? { ...piece, [field]: value } : piece
          )
        };
      }
      return area;
    }));
  };

  const calculateArea = (area) => {
    let totalSqft = 0;
    let totalLinearFt = 0;
    let maxWidth = 0;

    area.pieces.forEach(piece => {
      const lengthInches = parseFloat(piece.length) || 0;
      const widthInches = parseFloat(piece.width) || 0;
      
      const lengthFt = lengthInches / 12;
      const widthFt = widthInches / 12;
      
      totalSqft += lengthFt * widthFt;
      totalLinearFt += lengthFt;
      maxWidth = Math.max(maxWidth, widthInches);
    });

    let isStandardDepth = false;
    let depthKey = 'narrow';
    
    if (area.countertopStyle === 'A') {
      if (area.depthType === 'narrow') {
        isStandardDepth = maxWidth === 22.5 || maxWidth === 25.5;
      } else if (area.depthType === 'wide') {
        isStandardDepth = maxWidth <= 30.5;
        depthKey = 'wide';
      }
    }
    
    const selectedMaterial = stockMaterials[area.materialBrand]?.find(m => m.id === area.materialId);
    const materialLevel = selectedMaterial?.level || '1';
    const baseRate = pricing.linearFootage[depthKey][materialLevel] || 0;
    
    let subtotal = 0;
    subtotal += totalLinearFt * baseRate;
    
    const edgeLengthFt = (parseFloat(area.edgeLength) || 0) / 12;
    subtotal += edgeLengthFt * pricing.edges[area.edgeType];
    
    const applianceEdgeFt = (parseFloat(area.applianceEdge) || 0) / 12;
    subtotal += applianceEdgeFt * pricing.edges.appliance;
    
    const splashLengthFt = (parseFloat(area.splashLength) || 0) / 12;
    if (splashLengthFt > 0) {
      subtotal += splashLengthFt * pricing.splash.side;
    }
    
    if (area.needsTemplate) {
      subtotal += pricing.extras.template;
    }
    
    if (area.needsInstallation) {
      subtotal += totalLinearFt * pricing.extras.installation;
    }
    
    const seams = parseInt(area.seams) || 0;
    subtotal += seams * pricing.extras.seam;
    
    // Buildup charge (optional)
    if (area.needsBuildup) {
      subtotal += totalLinearFt * pricing.extras.buildup;
    }
    
    if (!isStandardDepth) {
      subtotal += totalLinearFt * pricing.extras.nonStandardDepth;
    }
    
    return {
      sqft: totalSqft.toFixed(1),
      linearFt: totalLinearFt.toFixed(1),
      subtotal: subtotal,
      materialInfo: selectedMaterial,
      pieceCount: area.pieces.length,
      isStandardDepth: isStandardDepth,
      maxWidth: maxWidth
    };
  };

  const calculateTotal = () => {
    let total = 0;
    areas.forEach(area => {
      const calc = calculateArea(area);
      total += calc.subtotal;
    });
    
    const gst = total * 0.05;
    const finalTotal = total + gst;
    
    return { subtotal: total, gst: gst, total: finalTotal };
  };

  const totals = calculateTotal();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="bg-blue-600 text-white p-6 rounded-t-lg">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Calculator className="w-8 h-8" />
          Laminate Quote Calculator
        </h1>
        <p className="mt-2 opacity-90">Get an instant quote for your laminate countertops (30% customer discount applied)</p>
      </div>

      <div className="bg-gray-50 p-6 border-x border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Project Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Customer Name</label>
            <input
              type="text"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              className="w-full p-2 border rounded-md"
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Project Name</label>
            <input
              type="text"
              value={customerInfo.project}
              onChange={(e) => setCustomerInfo({...customerInfo, project: e.target.value})}
              className="w-full p-2 border rounded-md"
              placeholder="Enter project name"
            />
          </div>
        </div>
      </div>

      <div className="border-x border-gray-200">
        {areas.map((area, index) => (
          <div key={area.id} className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Area {index + 1}: 
                <input
                  type="text"
                  value={area.name}
                  onChange={(e) => updateArea(area.id, 'name', e.target.value)}
                  className="ml-2 p-1 border rounded text-lg font-semibold bg-transparent"
                />
              </h3>
              {areas.length > 1 && (
                <button onClick={() => removeArea(area.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Countertop Style</label>
                <select
                  value={area.countertopStyle}
                  onChange={(e) => updateArea(area.id, 'countertopStyle', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="A">A(B/S) - With Backsplash</option>
                  <option value="I">I(No B/S) - No Backsplash</option>
                  <option value="B">B(Bar) - Bar Style</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Material Brand</label>
                <select
                  value={area.materialBrand}
                  onChange={(e) => {
                    const newBrand = e.target.value;
                    const firstMaterial = stockMaterials[newBrand][0];
                    updateArea(area.id, 'materialBrand', newBrand);
                    updateArea(area.id, 'materialId', firstMaterial.id);
                  }}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Wilsonart">Wilsonart</option>
                  <option value="Formica">Formica</option>
                  <option value="Arborite">Arborite</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pattern</label>
                <select
                  value={area.materialId}
                  onChange={(e) => updateArea(area.id, 'materialId', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {stockMaterials[area.materialBrand]?.map(material => (
                    <option key={material.id} value={material.id}>
                      {material.name} (Level {material.level})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Edge Type</label>
                <select
                  value={area.edgeType}
                  onChange={(e) => updateArea(area.id, 'edgeType', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="square-wrap">Square Wrap</option>
                  <option value="bevel-edge">Bevel Edge</option>
                  <option value="maple-bevel-edge">Maple Bevel Edge</option>
                  <option value="self-edge">Self Edge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Depth Type</label>
                <select
                  value={area.depthType}
                  onChange={(e) => updateArea(area.id, 'depthType', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="narrow">Narrow Depth</option>
                  <option value="wide">Wide Depth</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-md font-semibold">Countertop Pieces</h4>
                <button
                  onClick={() => addPiece(area.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  <Plus className="w-3 h-3" />
                  Add Piece
                </button>
              </div>
              
              {area.pieces.map((piece, pieceIndex) => (
                <div key={piece.id} className="flex items-center gap-3 mb-2 p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium min-w-16">Piece {pieceIndex + 1}:</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      step="0.5"
                      value={piece.length}
                      onChange={(e) => updatePiece(area.id, piece.id, 'length', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Length (inches)"
                    />
                  </div>
                  <span className="text-sm">×</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      step="0.5"
                      value={piece.width}
                      onChange={(e) => updatePiece(area.id, piece.id, 'width', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Width (inches)"
                    />
                  </div>
                  {area.pieces.length > 1 && (
                    <button
                      onClick={() => removePiece(area.id, piece.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Edge Length (inches)</label>
                <input
                  type="number"
                  step="0.5"
                  value={area.edgeLength}
                  onChange={(e) => updateArea(area.id, 'edgeLength', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Appliance Edge (inches)</label>
                <input
                  type="number"
                  step="0.5"
                  value={area.applianceEdge}
                  onChange={(e) => updateArea(area.id, 'applianceEdge', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Number of Seams</label>
                <input
                  type="number"
                  value={area.seams}
                  onChange={(e) => updateArea(area.id, 'seams', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Side Splash Length (inches) - $22.30 per LF</label>
                <input
                  type="number"
                  step="0.5"
                  value={area.splashLength}
                  onChange={(e) => updateArea(area.id, 'splashLength', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={area.needsTemplate}
                  onChange={(e) => updateArea(area.id, 'needsTemplate', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm">Include Template ($106.72)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={area.needsInstallation}
                  onChange={(e) => updateArea(area.id, 'needsInstallation', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm">Include Installation</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={area.needsBuildup}
                  onChange={(e) => updateArea(area.id, 'needsBuildup', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm">Include Buildup ($3.50/LF)</label>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div><span className="font-medium">Pieces:</span> {calculateArea(area).pieceCount}</div>
                  <div><span className="font-medium">Square Feet:</span> {calculateArea(area).sqft}</div>
                  <div><span className="font-medium">Linear Feet:</span> {calculateArea(area).linearFt}</div>
                  <div><span className="font-medium">Max Width:</span> {calculateArea(area).maxWidth}"</div>
                </div>
                <div>
                  <div><span className="font-medium">Material:</span> {calculateArea(area).materialInfo?.name || 'Not selected'}</div>
                  <div><span className="font-medium">Level:</span> {calculateArea(area).materialInfo?.level || 'N/A'}</div>
                  <div><span className="font-medium">Finish:</span> {calculateArea(area).materialInfo?.finish || 'N/A'}</div>
                  <div><span className="font-medium">Area Subtotal:</span> ${calculateArea(area).subtotal.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-x border-gray-200">
        <button
          onClick={addArea}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
          Add Another Area
        </button>
      </div>

      <div className="bg-gray-50 p-6 rounded-b-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Quote Summary
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Details */}
          <div>
            <h3 className="font-semibold mb-2">Project Details</h3>
            <div className="space-y-1 text-sm">
              <div><span className="font-medium">Customer:</span> {customerInfo.name || 'Not specified'}</div>
              <div><span className="font-medium">Project:</span> {customerInfo.project || 'Not specified'}</div>
              <div><span className="font-medium">Total Areas:</span> {areas.length}</div>
              <div><span className="font-medium">Total Pieces:</span> {areas.reduce((sum, area) => sum + area.pieces.length, 0)}</div>
              <div><span className="font-medium">Total Sq Ft:</span> {areas.reduce((sum, area) => sum + parseFloat(calculateArea(area).sqft), 0).toFixed(1)}</div>
              <div><span className="font-medium">Total Lin Ft:</span> {areas.reduce((sum, area) => sum + parseFloat(calculateArea(area).linearFt), 0).toFixed(1)}</div>
            </div>
          </div>
          
          {/* Detailed Breakdown */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-3">Detailed Breakdown</h3>
            <div className="space-y-4">
              {areas.map((area, areaIndex) => {
                const areaCalc = calculateArea(area);
                const selectedMaterial = stockMaterials[area.materialBrand]?.find(m => m.id === area.materialId);
                const materialLevel = selectedMaterial?.level || '1';
                const depthKey = area.depthType === 'wide' ? 'wide' : 'narrow';
                const baseRate = pricing.linearFootage[depthKey][materialLevel] || 0;
                
                return (
                  <div key={area.id} className="p-4 bg-white rounded border">
                    <div className="font-medium text-blue-600 mb-2">
                      {area.name} - {selectedMaterial?.name} (Level {materialLevel})
                    </div>
                    
                    {/* Individual Pieces */}
                    <div className="mb-3">
                      <div className="text-sm font-medium mb-1">Pieces:</div>
                      {area.pieces.map((piece, pieceIndex) => {
                        const lengthInches = parseFloat(piece.length) || 0;
                        const widthInches = parseFloat(piece.width) || 0;
                        const lengthFt = lengthInches / 12;
                        const widthFt = widthInches / 12;
                        const pieceSqft = lengthFt * widthFt;
                        const pieceLinearFt = lengthFt;
                        const pieceBasePrice = pieceLinearFt * baseRate;
                        const pieceBuildupPrice = area.needsBuildup ? pieceLinearFt * pricing.extras.buildup : 0;
                        const pieceTotal = pieceBasePrice + pieceBuildupPrice;
                        
                        return (
                          <div key={piece.id} className="text-xs text-gray-600 ml-2 flex justify-between">
                            <span>
                              Piece {pieceIndex + 1}: {lengthInches}" × {widthInches}" 
                              ({pieceSqft.toFixed(1)} sq ft, {pieceLinearFt.toFixed(1)} LF)
                            </span>
                            <span>${pieceTotal.toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Pricing Breakdown */}
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>{areaCalc.linearFt} LF × ${baseRate.toFixed(2)} ({area.depthType} depth, Level {materialLevel}):</span>
                        <span>${(parseFloat(areaCalc.linearFt) * baseRate).toFixed(2)}</span>
                      </div>
                      
                      {area.needsBuildup && (
                        <div className="flex justify-between">
                          <span>{areaCalc.linearFt} LF × $3.50 (Buildup):</span>
                          <span>${(parseFloat(areaCalc.linearFt) * pricing.extras.buildup).toFixed(2)}</span>
                        </div>
                      )}
                      
                      {parseFloat(area.edgeLength) > 0 && (
                        <div className="flex justify-between">
                          <span>{(parseFloat(area.edgeLength) / 12).toFixed(1)} LF × ${pricing.edges[area.edgeType].toFixed(2)} ({area.edgeType}):</span>
                          <span>${((parseFloat(area.edgeLength) / 12) * pricing.edges[area.edgeType]).toFixed(2)}</span>
                        </div>
                      )}
                      
                      {parseFloat(area.applianceEdge) > 0 && (
                        <div className="flex justify-between">
                          <span>{(parseFloat(area.applianceEdge) / 12).toFixed(1)} LF Appliance Edge:</span>
                          <span>${((parseFloat(area.applianceEdge) / 12) * pricing.edges.appliance).toFixed(2)}</span>
                        </div>
                      )}
                      
                      {parseFloat(area.splashLength) > 0 && (
                        <div className="flex justify-between">
                          <span>{(parseFloat(area.splashLength) / 12).toFixed(1)} LF × $22.30 (Side Splash):</span>
                          <span>${((parseFloat(area.splashLength) / 12) * pricing.splash.side).toFixed(2)}</span>
                        </div>
                      )}
                      
                      {parseInt(area.seams) > 0 && (
                        <div className="flex justify-between">
                          <span>{area.seams} × Seam:</span>
                          <span>${(parseInt(area.seams) * pricing.extras.seam).toFixed(2)}</span>
                        </div>
                      )}
                      
                      {area.needsTemplate && (
                        <div className="flex justify-between">
                          <span>Template:</span>
                          <span>${pricing.extras.template.toFixed(2)}</span>
                        </div>
                      )}
                      
                      {area.needsInstallation && (
                        <div className="flex justify-between">
                          <span>{areaCalc.linearFt} LF × $18.33 (Installation):</span>
                          <span>${(parseFloat(areaCalc.linearFt) * pricing.extras.installation).toFixed(2)}</span>
                        </div>
                      )}
                      
                      {!areaCalc.isStandardDepth && (
                        <div className="flex justify-between text-red-600">
                          <span>{areaCalc.linearFt} LF × $5.75 (Non-Standard Depth):</span>
                          <span>${(parseFloat(areaCalc.linearFt) * pricing.extras.nonStandardDepth).toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="border-t pt-1 flex justify-between font-medium">
                        <span>Area Subtotal:</span>
                        <span>${areaCalc.subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Final Totals */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div></div>
          <div className="bg-white p-4 rounded-md border">
            <h3 className="font-semibold mb-3">Final Totals</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%):</span>
                <span>${totals.gst.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total Price:</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaminateQuoteCalculator;
