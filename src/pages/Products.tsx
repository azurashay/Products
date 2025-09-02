import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  problemsSolved: string[];
  industries: string[];
  competitors: string[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  marketShare?: string;
  revenue?: string;
  customerCount?: string;
  category: string;
  aiStatus: 'enriched' | 'pending';
  keyFeatures: string[];
  useCase: string;
  contentAssets: number;
  image?: string;
}

interface Solution {
  id: string;
  name: string;
  description: string;
  problemsSolved: string[];
  industries: string[];
  competitors: string[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  marketShare?: string;
  revenue?: string;
  customerCount?: string;
  relatedProducts?: string[]; // IDs of related products
  category: string;
  aiStatus: 'enriched' | 'pending';
  keyFeatures: string[];
  useCase: string;
  contentAssets: number;
  image?: string;
}

type ItemWithType = (Product | Solution) & {
  type: 'product' | 'solution';
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    // Sample data
    {
      id: '1',
      name: 'Cisco Catalyst 9000 Series',
      description: 'Next-generation enterprise switching platform with intent-based networking capabilities',
      problemsSolved: ['Network automation', 'Security integration', 'Scalable switching', 'IoT connectivity'],
      industries: ['Enterprise', 'Education', 'Healthcare', 'Manufacturing'],
      competitors: ['Aruba', 'Juniper Networks', 'Extreme Networks'],
      status: 'active',
      createdAt: '2023-01-15',
      marketShare: '32%',
      revenue: '$2.1B',
      customerCount: '15,000+',
      category: 'Network Infrastructure',
      aiStatus: 'enriched',
      keyFeatures: [
        'Network Automation',
        'Advanced Security Integration',
        'Scalable Switching',
        'IoT Connectivity'
      ],
      useCase: 'Enterprise network infrastructure and automation',
      contentAssets: 12,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: '2',
      name: 'Cisco Firepower NGFW',
      description: 'Next-generation firewall with advanced threat protection and application visibility',
      problemsSolved: ['Network security', 'Threat detection', 'Application control', 'Intrusion prevention'],
      industries: ['Enterprise', 'Government', 'Financial Services', 'Healthcare'],
      competitors: ['Palo Alto Networks', 'Fortinet FortiGate', 'Check Point'],
      status: 'active',
      createdAt: '2023-03-10',
      marketShare: '18%',
      revenue: '$1.2B',
      customerCount: '12,000+',
      category: 'Security',
      aiStatus: 'enriched',
      keyFeatures: [
        'Advanced Network Security',
        'Real-time Threat Detection',
        'Granular Application Control',
        'Intrusion Prevention System'
      ],
      useCase: 'Enterprise security and threat protection',
      contentAssets: 15,
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center'
    }
  ]);

  const [solutions, setSolutions] = useState<Solution[]>([
    // Sample Solutions data
    {
      id: 's1',
      name: 'Enterprise Security Suite',
      description: 'Comprehensive security solution combining multiple products for enterprise protection',
      problemsSolved: ['Complete security coverage', 'Centralized management', 'Cost optimization', 'Compliance reporting'],
      industries: ['Enterprise', 'Financial Services', 'Healthcare', 'Government'],
      competitors: ['Microsoft Security', 'CrowdStrike Falcon', 'SentinelOne'],
      status: 'active',
      createdAt: '2023-09-15',
      marketShare: '22%',
      revenue: '$3.2B',
      customerCount: '8,500+',
      relatedProducts: ['3'], // Firepower NGFW
      category: 'Security Suite',
      aiStatus: 'enriched',
      keyFeatures: ['Security Coverage', 'Centralized Management', 'Cost Optimization', 'Compliance Reporting'],
      useCase: 'Enterprise security and compliance management',
      contentAssets: 18,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 's2',
      name: 'Smart Workplace Solution',
      description: 'Integrated collaboration and communication platform for modern workplaces',
      problemsSolved: ['Hybrid work enablement', 'Team collaboration', 'Communication unification', 'Productivity boost'],
      industries: ['Enterprise', 'Education', 'Healthcare', 'Technology'],
      competitors: ['Microsoft 365', 'Google Workspace', 'Slack Enterprise'],
      status: 'active',
      createdAt: '2023-10-20',
      marketShare: '18%',
      revenue: '$2.8B',
      customerCount: '12,000+',
      relatedProducts: ['5', '6'], // Webex and IP Phones
      category: 'Collaboration Suite',
      aiStatus: 'enriched',
      keyFeatures: ['Hybrid Work', 'Team Collaboration', 'Communication', 'Productivity Boost'],
      useCase: 'Modern workplace collaboration and productivity',
      contentAssets: 25,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop&crop=center'
    }
  ]);

  const [currentFilter, setCurrentFilter] = useState<'all' | 'products' | 'solutions'>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [problemsInput, setProblemsInput] = useState('');
  const [industriesInput, setIndustriesInput] = useState('');
  const [competitorsInput, setCompetitorsInput] = useState('');
  const [productStatus, setProductStatus] = useState<'active' | 'inactive' | 'draft'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importText, setImportText] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [productUrl, setProductUrl] = useState('');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [contextMenu, setContextMenu] = useState<{ open: boolean; x: number; y: number; itemId: string | null }>({
    open: false,
    x: 0,
    y: 0,
    itemId: null
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [editingFeatures, setEditingFeatures] = useState<string[]>([]);
  const [editingPainPoints, setEditingPainPoints] = useState<string[]>([]);
  const [editingCompetitors, setEditingCompetitors] = useState<string[]>([]);
  const [isEditingFeatures, setIsEditingFeatures] = useState(false);
  const [isEditingPainPoints, setIsEditingPainPoints] = useState(false);
  const [isEditingCompetitors, setIsEditingCompetitors] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newPainPoint, setNewPainPoint] = useState('');
  const [newCompetitor, setNewCompetitor] = useState('');

  // Combine products and solutions into unified items list
  const allItems: ItemWithType[] = [
    ...products.map(p => ({ ...p, type: 'product' as const })),
    ...solutions.map(s => ({ ...s, type: 'solution' as const }))
  ];

  // Calculate KPIs
  const kpis = {
    totalItems: allItems.length,
    totalProducts: products.length,
    totalSolutions: solutions.length,
    activeItems: allItems.filter(item => item.status === 'active').length,
    draftItems: allItems.filter(item => item.status === 'draft').length,
    avgCompetitors: Math.round(allItems.reduce((sum, item) => sum + item.competitors.length, 0) / allItems.length || 0)
  };

  // Filter items based on search, status, and type
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.industries.some(industry => 
                           industry.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = currentFilter === 'all' || 
                       (currentFilter === 'products' && item.type === 'product') ||
                       (currentFilter === 'solutions' && item.type === 'solution');
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setEditingSolution(null);
    setSelectedProduct(null);
    setProductName('');
    setProductDescription('');
    setProblemsInput('');
    setIndustriesInput('');
    setCompetitorsInput('');
    setProductStatus('active');
    setIsEditMode(true);
    setShowProductModal(true);
  };

  const handleAddSolution = () => {
    // Create a temporary solution object to indicate we're adding a solution
    const tempSolution: Solution = {
      id: 'temp',
      name: '',
      description: '',
      problemsSolved: [],
      industries: [],
      competitors: [],
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      category: 'Solution',
      aiStatus: 'pending',
      keyFeatures: [],
      useCase: 'Business solution',
      contentAssets: 0,
      image: '📦'
    };
    setEditingProduct(null);
    setEditingSolution(tempSolution);
    setSelectedProduct(null);
    setProductName('');
    setProductDescription('');
    setProblemsInput('');
    setIndustriesInput('');
    setCompetitorsInput('');
    setProductStatus('active');
    setIsEditMode(true);
    setShowProductModal(true);
    setShowAddDropdown(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate processing the file
      setSnackbar({ open: true, message: `Processing file: ${file.name}`, severity: 'success' });
      
      // Here you would typically parse the file and extract product data
      // For now, we'll just open the manual form
      setTimeout(() => {
        handleAddProduct();
      }, 1000);
    }
    setShowAddDropdown(false);
  };

  const handleUrlSubmit = () => {
    if (productUrl.trim()) {
      // Simulate processing the URL
      setSnackbar({ open: true, message: `Processing URL: ${productUrl}`, severity: 'success' });
      
      // Here you would typically fetch data from the URL
      // For now, we'll just open the manual form
      setTimeout(() => {
        handleAddProduct();
      }, 1000);
    }
    setShowUrlInput(false);
    setProductUrl('');
  };

  const handleManualEntry = () => {
    handleAddProduct();
    setShowAddDropdown(false);
  };



  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.add-product-dropdown')) {
        setShowAddDropdown(false);
      }
    };

    if (showAddDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddDropdown]);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditingProduct(product);
    setProductName(product.name);
    setProductDescription(product.description);
    setProblemsInput(product.problemsSolved.join(', '));
    setIndustriesInput(product.industries.join(', '));
    setCompetitorsInput(product.competitors.join(', '));
    setProductStatus(product.status);
    setIsEditMode(true);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    setSnackbar({ open: true, message: 'Product deleted successfully', severity: 'success' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditMode(false);
    setShowProductModal(true);
  };

  const handleItemClick = (item: ItemWithType) => {
    setSelectedProduct(item);
    setIsEditMode(false);
    setShowProductModal(true);
  };

  const handleEditItem = (item: ItemWithType) => {
    setSelectedProduct(item);
    if (item.type === 'product') {
      setEditingProduct(item as Product);
      setEditingSolution(null);
    } else {
      setEditingSolution(item as Solution);
      setEditingProduct(null);
    }
    setProductName(item.name);
    setProductDescription(item.description);
    setProblemsInput(item.problemsSolved.join(', '));
    setIndustriesInput(item.industries.join(', '));
    setCompetitorsInput(item.competitors.join(', '));
    setProductStatus(item.status);
    setIsEditMode(true);
    setShowProductModal(true);
  };

  const handleDeleteItem = (item: ItemWithType) => {
    if (item.type === 'product') {
      setProducts(products.filter(product => product.id !== item.id));
      setSnackbar({ open: true, message: 'Product deleted successfully', severity: 'success' });
    } else {
      setSolutions(solutions.filter(solution => solution.id !== item.id));
      setSnackbar({ open: true, message: 'Solution deleted successfully', severity: 'success' });
    }
  };

  // AI Enhancement Functions
  const handleEnhanceWithAI = async (type: 'features' | 'painPoints' | 'competitors', currentData: string[]) => {
    const prompt = `Analyze and enhance the following ${type} for "${selectedProduct?.name}" (${selectedProduct && 'relatedProducts' in selectedProduct ? 'Solution' : 'Product'}):
    
Current ${type}:
${currentData.join('\n')}

Please provide:
1. Additional relevant ${type}
2. Industry-specific insights
3. Competitive analysis
4. Market trends

Format as a simple list.`;

    try {
      // Simulate AI response - in real implementation, this would call an AI API
      const enhancedData = await simulateAIResponse(type, currentData);
      
      switch (type) {
        case 'features':
          setEditingFeatures([...currentData, ...enhancedData]);
          setIsEditingFeatures(true);
          break;
        case 'painPoints':
          setEditingPainPoints([...currentData, ...enhancedData]);
          setIsEditingPainPoints(true);
          break;
        case 'competitors':
          setEditingCompetitors([...currentData, ...enhancedData]);
          setIsEditingCompetitors(true);
          break;
      }
      
      setSnackbar({ open: true, message: `AI enhanced ${type} successfully`, severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `Failed to enhance ${type} with AI`, severity: 'error' });
    }
  };

  const simulateAIResponse = async (type: string, currentData: string[]): Promise<string[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const enhancedData: { [key: string]: string[] } = {
      features: [
        'AI-powered predictive analytics',
        'Real-time data synchronization',
        'Advanced reporting dashboard',
        'Multi-language support',
        'Mobile-first responsive design',
        'API-first architecture',
        'Cloud-native deployment',
        'Zero-downtime updates'
      ],
      painPoints: [
        'Legacy system integration challenges',
        'Data migration complexity',
        'User adoption resistance',
        'Scalability limitations',
        'Security compliance gaps',
        'Performance bottlenecks',
        'Cost optimization needs',
        'Training and support requirements'
      ],
      competitors: [
        'Microsoft Dynamics 365',
        'Salesforce Platform',
        'Oracle Cloud',
        'SAP S/4HANA',
        'Adobe Experience Cloud',
        'HubSpot Enterprise',
        'Pega Platform',
        'ServiceNow'
      ]
    };
    
    return enhancedData[type] || [];
  };

  // Edit Functions
  const handleStartEditing = (type: 'features' | 'painPoints' | 'competitors') => {
    switch (type) {
      case 'features':
        setEditingFeatures(selectedProduct?.keyFeatures || []);
        setIsEditingFeatures(true);
        break;
      case 'painPoints':
        setEditingPainPoints(selectedProduct?.problemsSolved || []);
        setIsEditingPainPoints(true);
        break;
      case 'competitors':
        setEditingCompetitors(selectedProduct?.competitors || []);
        setIsEditingCompetitors(true);
        break;
    }
  };

  const handleSaveEditing = (type: 'features' | 'painPoints' | 'competitors') => {
    if (!selectedProduct) return;

    const updatedProduct = { ...selectedProduct };
    
    switch (type) {
      case 'features':
        updatedProduct.keyFeatures = editingFeatures;
        setIsEditingFeatures(false);
        break;
      case 'painPoints':
        updatedProduct.problemsSolved = editingPainPoints;
        setIsEditingPainPoints(false);
        break;
      case 'competitors':
        updatedProduct.competitors = editingCompetitors;
        setIsEditingCompetitors(false);
        break;
    }

    // Update the item in the appropriate array
    if (selectedProduct && 'relatedProducts' in selectedProduct) {
      setSolutions(solutions.map(s => s.id === selectedProduct.id ? updatedProduct as Solution : s));
    } else {
      setProducts(products.map(p => p.id === selectedProduct.id ? updatedProduct as Product : p));
    }
    
    setSelectedProduct(updatedProduct);
    setSnackbar({ open: true, message: `${type} updated successfully`, severity: 'success' });
  };

  const handleCancelEditing = (type: 'features' | 'painPoints' | 'competitors') => {
    switch (type) {
      case 'features':
        setIsEditingFeatures(false);
        break;
      case 'painPoints':
        setIsEditingPainPoints(false);
        break;
      case 'competitors':
        setIsEditingCompetitors(false);
        break;
    }
  };

  const handleAddItem = (type: 'features' | 'painPoints' | 'competitors') => {
    let newItem = '';
    let setNewItem = (value: string) => {};
    let currentItems: string[] = [];
    let setCurrentItems = (items: string[]) => {};

    switch (type) {
      case 'features':
        newItem = newFeature;
        setNewItem = setNewFeature;
        currentItems = editingFeatures;
        setCurrentItems = setEditingFeatures;
        break;
      case 'painPoints':
        newItem = newPainPoint;
        setNewItem = setNewPainPoint;
        currentItems = editingPainPoints;
        setCurrentItems = setEditingPainPoints;
        break;
      case 'competitors':
        newItem = newCompetitor;
        setNewItem = setNewCompetitor;
        currentItems = editingCompetitors;
        setCurrentItems = setEditingCompetitors;
        break;
    }

    if (newItem.trim()) {
      setCurrentItems([...currentItems, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (type: 'features' | 'painPoints' | 'competitors', index: number) => {
    switch (type) {
      case 'features':
        setEditingFeatures(editingFeatures.filter((_, i) => i !== index));
        break;
      case 'painPoints':
        setEditingPainPoints(editingPainPoints.filter((_, i) => i !== index));
        break;
      case 'competitors':
        setEditingCompetitors(editingCompetitors.filter((_, i) => i !== index));
        break;
    }
  };

  const handleContextMenu = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      open: true,
      x: e.clientX,
      y: e.clientY,
      itemId
    });
  };

  const closeContextMenu = () => {
    setContextMenu({
      open: false,
      x: 0,
      y: 0,
      itemId: null
    });
  };

  const handleContextMenuAction = (action: string, itemId: string) => {
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;

    switch (action) {
      case 'edit':
        handleEditItem(item);
        break;
      case 'view':
        handleItemClick(item);
        break;
      case 'delete':
        handleDeleteItem(item);
        break;
      case 'campaign':
        setSnackbar({ open: true, message: 'Create Campaign feature coming soon!', severity: 'success' });
        break;
    }
    closeContextMenu();
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'chip-green';
      case 'inactive': return 'chip-red';
      case 'draft': return 'chip-yellow';
      default: return 'chip-gray';
    }
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
    setEditingProduct(null);
    setIsEditMode(false);
    setProductName('');
    setProductDescription('');
    setProblemsInput('');
    setIndustriesInput('');
    setCompetitorsInput('');
    setProductStatus('active');
  };

  const handleSave = () => {
    if (!productName.trim()) {
      setSnackbar({ open: true, message: 'Please enter a product name', severity: 'error' });
      return;
    }

    if (!productDescription.trim()) {
      setSnackbar({ open: true, message: 'Please enter a product description', severity: 'error' });
      return;
    }

    const problems = problemsInput
      .split(',')
      .map(problem => problem.trim())
      .filter(problem => problem.length > 0);

    const industries = industriesInput
      .split(',')
      .map(industry => industry.trim())
      .filter(industry => industry.length > 0);

    const competitors = competitorsInput
      .split(',')
      .map(competitor => competitor.trim())
      .filter(competitor => competitor.length > 0);

    if (editingProduct) {
      // Edit existing product
      const updatedProduct = { 
        ...editingProduct, 
        name: productName, 
        description: productDescription, 
        problemsSolved: problems, 
        industries, 
        competitors, 
        status: productStatus 
      };
      
      setProducts(products.map(product =>
        product.id === editingProduct.id ? updatedProduct : product
      ));
      
      setSelectedProduct(updatedProduct);
      setSnackbar({ open: true, message: 'Product updated successfully', severity: 'success' });
      setIsEditMode(false);
      setEditingProduct(null);
    } else if (editingSolution) {
      // Edit existing solution
      const updatedSolution = { 
        ...editingSolution, 
        name: productName, 
        description: productDescription, 
        problemsSolved: problems, 
        industries, 
        competitors, 
        status: productStatus,
        relatedProducts: editingSolution.relatedProducts || []
      };
      
      setSolutions(solutions.map(solution =>
        solution.id === editingSolution.id ? updatedSolution : solution
      ));
      
      setSelectedProduct(updatedSolution);
      setSnackbar({ open: true, message: 'Solution updated successfully', severity: 'success' });
      setIsEditMode(false);
      setEditingSolution(null);
    } else {
      // Add new item - check if we're adding a solution or product
      if (editingSolution && (editingSolution as Solution).id === 'temp') {
        // Adding new solution
        const newSolution: Solution = {
          id: 's' + Date.now().toString(),
          name: productName,
          description: productDescription,
          problemsSolved: problems,
          industries,
          competitors,
          status: productStatus,
          createdAt: new Date().toISOString().split('T')[0],
          relatedProducts: (editingSolution as Solution).relatedProducts || [],
          category: 'Solution',
          aiStatus: 'pending',
          keyFeatures: [],
          useCase: 'Business solution',
          contentAssets: 0,
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center'
        };
        setSolutions([...solutions, newSolution]);
        setSelectedProduct(newSolution);
        setSnackbar({ open: true, message: 'Solution added successfully', severity: 'success' });
        setEditingSolution(null);
      } else {
              // Adding new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: productName,
        description: productDescription,
        problemsSolved: problems,
        industries,
        competitors,
        status: productStatus,
        createdAt: new Date().toISOString().split('T')[0],
        category: 'Product',
        aiStatus: 'pending',
        keyFeatures: [],
        useCase: 'Business product',
        contentAssets: 0,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&crop=center'
      };
      setProducts([...products, newProduct]);
      setSelectedProduct(newProduct);
      setSnackbar({ open: true, message: 'Product added successfully', severity: 'success' });
      }
      setIsEditMode(false);
    }
    
    // Reset form
    setProductName('');
    setProductDescription('');
    setProblemsInput('');
    setIndustriesInput('');
    setCompetitorsInput('');
    setProductStatus('active');
  };

  const handleSwitchToEdit = () => {
    if (selectedProduct) {
      setEditingProduct(selectedProduct);
      setProductName(selectedProduct.name);
      setProductDescription(selectedProduct.description);
      setProblemsInput(selectedProduct.problemsSolved.join(', '));
      setIndustriesInput(selectedProduct.industries.join(', '));
      setCompetitorsInput(selectedProduct.competitors.join(', '));
      setProductStatus(selectedProduct.status);
      setIsEditMode(true);
    }
  };

  const handleSwitchToView = () => {
    setIsEditMode(false);
    setEditingProduct(null);
    setProductName('');
    setProductDescription('');
    setProblemsInput('');
    setIndustriesInput('');
    setCompetitorsInput('');
    setProductStatus('active');
  };

  const handleImportProducts = () => {
    try {
      setSnackbar({ open: true, message: 'Import functionality implemented', severity: 'success' });
      setShowImportDialog(false);
      setImportText('');
    } catch (error) {
      setSnackbar({ open: true, message: 'Import failed', severity: 'error' });
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportText(content);
      };
      reader.readAsText(file);
    }
  };



  return (
    <div className="products-container">
      {/* Folloze Header with Title and Action Buttons */}
      <div className="folloze-products-header">
        <div className="header-content">
          <h1 className="page-title">Product & Solution Management</h1>
        <div className="header-actions">
            <button onClick={() => setShowImportDialog(true)} className="btn-import">
              Import Items
          </button>
            
            {/* Add Product Dropdown */}
            <div className="add-product-dropdown">
              <button 
                onClick={() => setShowAddDropdown(!showAddDropdown)} 
                className="btn-primary dropdown-toggle"
              >
                Add Product
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showAddDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleManualEntry} className="dropdown-item">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Manual Entry
                  </button>
                  
                  <label className="dropdown-item file-upload-label">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload File
                    <input
                      type="file"
                      accept=".csv,.json,.xlsx,.pdf"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  
                  <button onClick={() => setShowUrlInput(true)} className="dropdown-item">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    From URL
                  </button>
                </div>
              )}
            </div>

            <button onClick={handleAddSolution} className="btn-primary">
              Add Solution
          </button>
        </div>
          </div>
        </div>

      {/* Main Content Area with Full Functionality */}
      <div className="products-main-content">

      {/* Search and Filter Section */}
      <div className="search-filter">
          <div className="filter-controls">
            <div className="single-select-container">
              <select
                value={currentFilter}
                onChange={(e) => setCurrentFilter(e.target.value as 'all' | 'products' | 'solutions')}
                className="single-select"
              >
                <option value="all">All Items ({allItems.length})</option>
                <option value="products">Products ({products.length})</option>
                <option value="solutions">Solutions ({solutions.length})</option>
              </select>
            </div>
            
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
            
            <input
              type="text"
              placeholder="Search products and solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
      </div>

        {/* Items Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
                 <th>Image</th>
                 <th>Name</th>
                 <th>Category</th>
               <th>Status</th>
                 <th>AI Status</th>
                 <th>Key Features</th>
                 <th>Use Case</th>
                 <th>Assets</th>
                 <th></th>
            </tr>
          </thead>
                     <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} onClick={() => handleItemClick(item)} className="clickable-row">
                  <td>
                    <div className="item-image">
                      <img 
                        src={item.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&crop=center'} 
                        alt={item.name}
                        className="product-thumbnail"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&crop=center';
                        }}
                      />
                  </div>
                </td>
                <td>
                    <div className="product-name-cell">
                      <div className="product-name">{item.name}</div>
                      <div className="short-description">
                        {item.description.length > 80 ? `${item.description.substring(0, 80)}...` : item.description}
                      </div>
                      <div className="item-type-label">
                        <span className={`chip ${item.type === 'product' ? 'chip-blue' : 'chip-purple'}`}>
                          {item.type === 'product' ? 'Product' : 'Solution'}
                      </span>
                      </div>
                  </div>
                </td>
                                 <td>
                    <span className="chip chip-gray">{item.category}</span>
                  </td>
                  <td>
                    <span className={`chip ${getStatusClass(item.status)}`}>
                      {item.status}
                       </span>
                 </td>
                 <td>
                    <span className={`chip ${item.aiStatus === 'enriched' ? 'chip-green' : 'chip-yellow'}`}>
                      {item.aiStatus}
                       </span>
                  </td>
                  <td>
                    <div className="key-features-summary">
                      <span className="feature-count">{item.keyFeatures.length} features</span>
                      <div className="feature-highlights">
                        {item.keyFeatures.slice(0, 3).map((feature, index) => (
                          <span key={index} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                   </div>
                 </td>
                 <td>
                    <div className="use-case">
                      {item.useCase.length > 50 ? `${item.useCase.substring(0, 50)}...` : item.useCase}
                    </div>
                 </td>
                                 <td>
                    <div className="content-assets">
                      <span className="asset-count">{item.contentAssets} Assets</span>
                    </div>
                  </td>
                  <td>
                     <button
                      onClick={(e) => handleContextMenu(e, item.id)}
                      className="action-btn"
                      title="More actions"
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                       </svg>
                     </button>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>



      {/* URL Input Dialog */}
      {showUrlInput && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Product from URL</h2>
              <button onClick={() => {setShowUrlInput(false); setProductUrl('');}} className="close-btn">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Product URL</label>
                <input
                  type="url"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="https://example.com/product-page"
                  className="url-input"
                />
                <small>Enter the URL of the product page you want to import</small>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => {setShowUrlInput(false); setProductUrl('');}} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleUrlSubmit} className="btn-primary">
                Import from URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Dialog */}
      {showImportDialog && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Import Products</h2>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Import from File</label>
                <input
                  type="file"
                  accept=".csv,.json,.txt"
                  onChange={handleFileImport}
                  className="file-input"
                />
              </div>
              <div className="form-group">
                <label>Or paste data directly</label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  rows={10}
                  placeholder="Paste JSON or CSV data here..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => {setShowImportDialog(false); setImportText('');}} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleImportProducts} className="btn-primary">
                Import Products
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Product Modal */}
      {showProductModal && (
        <div className="modal-overlay">
          <div className="modal unified-product-modal">
            <div className="modal-header">
              <div className="product-header-info">
                {isEditMode ? (
                  <h2>{selectedProduct ? `Edit ${editingSolution ? 'Solution' : 'Product'}` : `Add New ${editingSolution ? 'Solution' : 'Product'}`}</h2>
                ) : (
                  <>
                    <h2>{selectedProduct?.name}</h2>

                    <span className={`chip ${getStatusClass(selectedProduct?.status || '')} product-status-large`}>
                      {selectedProduct?.status}
                    </span>
                  </>
                )}
              </div>
              <div className="header-actions">
                {!isEditMode && selectedProduct && (
                  <button onClick={handleSwitchToEdit} className="edit-mode-btn">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                )}
                {isEditMode && selectedProduct && (
                  <button onClick={handleSwitchToView} className="view-mode-btn">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                )}
                <button onClick={handleCloseModal} className="close-btn">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="modal-body unified-modal-body">
              {isEditMode ? (
                // Edit Mode - Keep existing form
                <div className="edit-form">
                  <div className="form-group">
                    <label>{editingSolution ? 'Solution Name' : 'Product Name'}</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder={editingSolution ? "Enter solution name" : "Enter product name"}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      rows={3}
                      placeholder={editingSolution ? "Enter detailed solution description" : "Enter detailed product description"}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Problems Solved (comma separated)</label>
                    <input
                      type="text"
                      value={problemsInput}
                      onChange={(e) => setProblemsInput(e.target.value)}
                      placeholder="e.g., Data analysis, Reporting, Real-time insights"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Industries (comma separated)</label>
                      <input
                        type="text"
                        value={industriesInput}
                        onChange={(e) => setIndustriesInput(e.target.value)}
                        placeholder="e.g., Technology, Finance, Healthcare"
                      />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={productStatus}
                        onChange={(e) => setProductStatus(e.target.value as any)}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Competitors (comma separated)</label>
                    <input
                      type="text"
                      value={competitorsInput}
                      onChange={(e) => setCompetitorsInput(e.target.value)}
                      placeholder="e.g., Competitor A, Competitor B, Competitor C"
                    />
                  </div>
                  
                  {editingSolution && (
                    <div className="form-group">
                      <label>Related Products</label>
                      <div className="related-products-section">
                        <div className="selected-products">
                          {editingSolution.relatedProducts?.map(productId => {
                            const product = products.find(p => p.id === productId);
                            return product ? (
                              <span key={productId} className="selected-product-chip">
                                {product.name}
                                <button 
                                  onClick={() => {
                                    const updatedProducts = editingSolution.relatedProducts?.filter(id => id !== productId) || [];
                                    setEditingSolution({
                                      ...editingSolution,
                                      relatedProducts: updatedProducts
                                    });
                                  }}
                                  className="remove-product-btn"
                                >
                                  ×
                                </button>
                              </span>
                            ) : null;
                          })}
                        </div>
                        
                        {/* Product Selection List */}
                        <div className="product-selection-list">
                          <h4>Available Products</h4>
                          <div className="product-list-container">
                            {products.map(product => (
                              <div 
                                key={product.id} 
                                className={`product-list-item ${editingSolution.relatedProducts?.includes(product.id) ? 'selected' : ''}`}
                                onClick={() => {
                                  const currentProducts = editingSolution.relatedProducts || [];
                                  const isSelected = currentProducts.includes(product.id);
                                  
                                  if (isSelected) {
                                    // Remove product
                                    const updatedProducts = currentProducts.filter(id => id !== product.id);
                                    setEditingSolution({
                                      ...editingSolution,
                                      relatedProducts: updatedProducts
                                    });
                                  } else {
                                    // Add product
                                    setEditingSolution({
                                      ...editingSolution,
                                      relatedProducts: [...currentProducts, product.id]
                                    });
                                  }
                                }}
                              >
                                <div className="product-list-checkbox">
                                  {editingSolution.relatedProducts?.includes(product.id) && (
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <div className="product-list-info">
                                  <h5>{product.name}</h5>
                                  <p>{product.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // View Mode with Tabs
                selectedProduct && (
                  <div className="view-content">
                    {/* Tabs Navigation */}
                    <div className="modal-tabs">
                      <button 
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                      >
                        Overview
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                        onClick={() => setActiveTab('features')}
                      >
                        Features
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'target-market' ? 'active' : ''}`}
                        onClick={() => setActiveTab('target-market')}
                      >
                        Target Market & Pain Points
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'assets' ? 'active' : ''}`}
                        onClick={() => setActiveTab('assets')}
                      >
                        Assets
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'competitors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('competitors')}
                      >
                        Competitors
                      </button>
                        </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                      {activeTab === 'overview' && (
                        <div className="overview-tab">
                          <div className="product-overview">
                            <h3>Product Overview</h3>
                            <div className="overview-grid">
                              <div className="overview-item">
                                <label>Name:</label>
                                <span>{selectedProduct.name}</span>
                        </div>
                              <div className="overview-item">
                                <label>Type:</label>
                                <span className={`chip ${selectedProduct && 'relatedProducts' in selectedProduct ? 'chip-purple' : 'chip-blue'}`}>
                                  {selectedProduct && 'relatedProducts' in selectedProduct ? 'Solution' : 'Product'}
                                </span>
                        </div>
                              <div className="overview-item">
                                <label>Short Description:</label>
                                <span>{selectedProduct.description}</span>
                      </div>
                              <div className="overview-item">
                                <label>Category:</label>
                                <span className="chip chip-gray">{selectedProduct.category}</span>
                        </div>
                              <div className="overview-item">
                                <label>Image/Logo:</label>
                                <div className="product-image-preview">
                                  <img 
                                    src={selectedProduct.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&crop=center'} 
                                    alt={selectedProduct.name}
                                    className="product-thumbnail"
                                  />
                        </div>
                        </div>
                      </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'features' && (
                        <div className="features-tab">
                          <div className="tab-header">
                            <h3>Key Features (Full List)</h3>
                            <div className="tab-actions">
                              {!isEditingFeatures ? (
                                <>
                                  <button 
                                    onClick={() => handleStartEditing('features')}
                                    className="edit-btn"
                                  >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => handleEnhanceWithAI('features', selectedProduct.keyFeatures)}
                                    className="ai-enhance-btn"
                                  >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                                    Enhance with AI
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button 
                                    onClick={() => handleSaveEditing('features')}
                                    className="save-btn"
                                  >
                              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                                    Save
                                  </button>
                                  <button 
                                    onClick={() => handleCancelEditing('features')}
                                    className="cancel-btn"
                                  >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                  </button>
                                </>
                              )}
                        </div>
                      </div>

                          {!isEditingFeatures ? (
                            <div className="features-list">
                              {selectedProduct.keyFeatures.map((feature, index) => (
                                <div key={index} className="feature-item">
                                  <div className="feature-content">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                                    <div className="feature-text">
                                      <div className="feature-title">{feature.split(' with ')[0].split(' featuring ')[0].split(' including ')[0].split(' using ')[0].split(' allowing ')[0]}</div>
                                      <div className="feature-description">{feature}</div>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => handleEnhanceWithAI('features', [feature])}
                                    className="ai-feature-btn"
                                    title="Ask AI about this feature"
                                  >
                              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                                  </button>
                            </div>
                          ))}
                        </div>
                          ) : (
                            <div className="editing-features">
                              <div className="features-list">
                                {editingFeatures.map((feature, index) => (
                                  <div key={index} className="feature-item editable">
                              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                                    <span>{feature}</span>
                                    <button 
                                      onClick={() => handleRemoveItem('features', index)}
                                      className="remove-btn"
                                    >
                                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                              </div>
                          ))}
                              </div>
                              <div className="add-item-form">
                                <input
                                  type="text"
                                  value={newFeature}
                                  onChange={(e) => setNewFeature(e.target.value)}
                                  placeholder="Add new feature..."
                                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem('features')}
                                />
                                <button onClick={() => handleAddItem('features')} className="add-btn">
                                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                  Add
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'target-market' && (
                        <div className="target-market-tab">
                          <div className="target-market-section">
                            <h3>Target Market</h3>
                            <div className="target-market-content">
                              <p><strong>Example:</strong> Enterprise B2B organizations with complex marketing operations.</p>
                              <div className="segmentation">
                                <label>Additional Segmentation:</label>
                                <div className="segmentation-chips">
                                  {selectedProduct.industries.map((industry, index) => (
                                    <span key={index} className="chip chip-blue">{industry}</span>
                          ))}
                        </div>
                              </div>
                              </div>
                      </div>

                          <div className="pain-points-section">
                            <div className="tab-header">
                              <h3>Pain Points Solved</h3>
                              <div className="tab-actions">
                                {!isEditingPainPoints ? (
                                  <>
                                    <button 
                                      onClick={() => handleStartEditing('painPoints')}
                                      className="edit-btn"
                                    >
                                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                                      Edit
                                    </button>
                                    <button 
                                      onClick={() => handleEnhanceWithAI('painPoints', selectedProduct.problemsSolved)}
                                      className="ai-enhance-btn"
                                    >
                                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                                      Enhance with AI
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button 
                                      onClick={() => handleSaveEditing('painPoints')}
                                      className="save-btn"
                                    >
                                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      Save
                                    </button>
                                    <button 
                                      onClick={() => handleCancelEditing('painPoints')}
                                      className="cancel-btn"
                                    >
                                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                      Cancel
                                    </button>
                                  </>
                                )}
                            </div>
                          </div>
                          
                            {!isEditingPainPoints ? (
                              <div className="pain-points-list">
                                {selectedProduct.problemsSolved.map((problem, index) => (
                                  <div key={index} className="pain-point-item">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                                    {problem}
                            </div>
                                ))}
                            </div>
                            ) : (
                              <div className="editing-pain-points">
                                <div className="pain-points-list">
                                  {editingPainPoints.map((problem, index) => (
                                    <div key={index} className="pain-point-item editable">
                                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                                      <span>{problem}</span>
                                      <button 
                                        onClick={() => handleRemoveItem('painPoints', index)}
                                        className="remove-btn"
                                      >
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                          </div>
                                  ))}
                            </div>
                                <div className="add-item-form">
                                  <input
                                    type="text"
                                    value={newPainPoint}
                                    onChange={(e) => setNewPainPoint(e.target.value)}
                                    placeholder="Add new pain point..."
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem('painPoints')}
                                  />
                                  <button onClick={() => handleAddItem('painPoints')} className="add-btn">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                                    Add
                                  </button>
                            </div>
                            </div>
                            )}
                          </div>
                        </div>
                      )}

                      {activeTab === 'assets' && (
                        <div className="assets-tab">
                          <h3>Content Assets</h3>
                          <div className="assets-grid">
                            <div className="asset-item">
                              <h4>Articles</h4>
                              <p>"Best Practices for Multi-Channel Campaigns."</p>
                            </div>
                            <div className="asset-item">
                              <h4>PDFs</h4>
                              <p>"Enterprise Guide to Marketing Automation."</p>
                            </div>
                            <div className="asset-item">
                              <h4>Videos</h4>
                              <p>"How Premium Marketing Suite Improves ROI."</p>
                          </div>
                            <div className="asset-item">
                              <h4>Case Study</h4>
                              <p>"Global Tech Corp – 30% Increase in Conversion."</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'competitors' && (
                        <div className="competitors-tab">
                          <div className="tab-header">
                            <h3>Competitors</h3>
                            <div className="tab-actions">
                              {!isEditingCompetitors ? (
                                <>
                                  <button 
                                    onClick={() => handleStartEditing('competitors')}
                                    className="edit-btn"
                                  >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => handleEnhanceWithAI('competitors', selectedProduct.competitors)}
                                    className="ai-enhance-btn"
                                  >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Enhance with AI
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button 
                                    onClick={() => handleSaveEditing('competitors')}
                                    className="save-btn"
                                  >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save
                                  </button>
                                  <button 
                                    onClick={() => handleCancelEditing('competitors')}
                                    className="cancel-btn"
                                  >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                  </button>
                                </>
                              )}
                            </div>
                            </div>
                          
                          {!isEditingCompetitors ? (
                            <div className="competitors-list">
                              {selectedProduct.competitors.map((competitor, index) => (
                                <div key={index} className="competitor-item">
                                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                                  {competitor}
                          </div>
                              ))}
                        </div>
                          ) : (
                            <div className="editing-competitors">
                              <div className="competitors-list">
                                {editingCompetitors.map((competitor, index) => (
                                  <div key={index} className="competitor-item editable">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>{competitor}</span>
                                    <button 
                                      onClick={() => handleRemoveItem('competitors', index)}
                                      className="remove-btn"
                                    >
                                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                      </div>
                                ))}
                        </div>
                              <div className="add-item-form">
                                <input
                                  type="text"
                                  value={newCompetitor}
                                  onChange={(e) => setNewCompetitor(e.target.value)}
                                  placeholder="Add new competitor..."
                                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem('competitors')}
                                />
                                <button onClick={() => handleAddItem('competitors')} className="add-btn">
                                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                  Add
                                </button>
                      </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
            
            <div className="modal-footer">
              {isEditMode ? (
                <>
                  <button onClick={handleCloseModal} className="btn-secondary">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="btn-primary">
                    {selectedProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleSwitchToEdit} className="btn-primary">
                    Edit Product
                  </button>
                  <button onClick={handleCloseModal} className="btn-secondary">
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu.open && (
        <div 
          className="context-menu-overlay"
          onClick={closeContextMenu}
        >
          <div 
            className="context-menu"
            style={{ 
              left: contextMenu.x, 
              top: contextMenu.y 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="context-menu-item"
              onClick={() => handleContextMenuAction('edit', contextMenu.itemId!)}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button 
              className="context-menu-item"
              onClick={() => handleContextMenuAction('campaign', contextMenu.itemId!)}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.25a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-.5zM11 5.25a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-.5zM11 5.25a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-.5z" />
              </svg>
              Create Campaign
            </button>
            <button 
              className="context-menu-item"
              onClick={() => handleContextMenuAction('view', contextMenu.itemId!)}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              View Products
            </button>
            <button 
              className="context-menu-item delete"
              onClick={() => handleContextMenuAction('delete', contextMenu.itemId!)}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}

      {/* System Messages */}
      {snackbar.open && (
        <div className={`snackbar ${snackbar.severity}`}>
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default Products;