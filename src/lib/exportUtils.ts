import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (): Promise<void> => {
  try {
    // Get the table container with data
    const tableContainer = document.querySelector('table') as HTMLElement;
    if (!tableContainer) {
      throw new Error('Table not found');
    }

    // Expand all rows before capturing for complete data
    const expandButtons = document.querySelectorAll('[data-state="closed"]');
    const wasExpanded: Element[] = [];
    
    expandButtons.forEach(button => {
      const clickableButton = button.querySelector('button');
      if (clickableButton) {
        clickableButton.click();
        wasExpanded.push(button);
      }
    });

    // Wait for expansions to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(tableContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      width: tableContainer.scrollWidth,
      height: tableContainer.scrollHeight,
    });

    // Restore original state
    wasExpanded.forEach(button => {
      const clickableButton = button.querySelector('button');
      if (clickableButton) {
        clickableButton.click();
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape for better table view
    
    const imgWidth = 297; // A4 landscape width
    const pageHeight = 210; // A4 landscape height
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('serp-data-export.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const exportToCSV = async (): Promise<void> => {
  try {
    // Detect if we're on dashboard or index page based on table structure
    const isDashboard = document.querySelector('[data-compare-mode]') !== null;
    
    // Expand all collapsible rows before extracting data
    const expandButtons = document.querySelectorAll('[data-state="closed"]');
    const wasExpanded: Element[] = [];
    
    expandButtons.forEach(button => {
      const clickableButton = button.querySelector('button');
      if (clickableButton) {
        clickableButton.click();
        wasExpanded.push(button);
      }
    });

    // Wait for expansions to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    const csvData: string[][] = [];
    
    if (isDashboard) {
      // Dashboard table headers
      const compareMode = document.querySelector('[data-compare-mode="true"]') !== null;
      
      if (compareMode) {
        csvData.push([
          'Keyword',
          'URL', 
          'Best Position (Nov-Dec)',
          'Nov 1 Position',
          'Dec 1 Position',
          'Difference (Nov-Dec)',
          'AI Status (Nov-Dec)',
          'Best Position (Jan-Feb)',
          'Jan 1 Position', 
          'Feb 1 Position',
          'Difference (Jan-Feb)',
          'AI Status (Jan-Feb)'
        ]);
      } else {
        csvData.push([
          'Keyword',
          'URL',
          'Best Position',
          'Nov 1 Position',
          'Dec 1 Position',
          'Difference',
          'AI Status'
        ]);
      }

      // Extract dashboard data
      const mainRows = document.querySelectorAll('table tbody tr:not([class*="bg-blue"])');
      mainRows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 1) { // Skip if not a data row
          const rowData: string[] = [];
          cells.forEach((cell, index) => {
            // Skip checkbox column (first)
            if (index === 0) return;
            
            const text = cell.textContent?.trim() || '';
            rowData.push(text);
          });
          
          if (rowData.length > 0) {
            csvData.push(rowData);
          }
        }
      });

      // Add expanded row data
      const expandedRows = document.querySelectorAll('table tbody tr[class*="bg-blue"]');
      expandedRows.forEach((expandedRow) => {
        csvData.push(['--- Detailed Analysis ---']);
        csvData.push(['Date', 'URL', 'Position']);
        
        // Extract detailed data from expanded view
        const detailElements = expandedRow.querySelectorAll('.text-sm');
        detailElements.forEach(element => {
          const text = element.textContent?.trim() || '';
          if (text.includes('Feb') && text.includes('2025')) {
            csvData.push([text, '', '']);
          }
        });
      });

    } else {
      // Index page table headers  
      csvData.push([
        'Domain',
        'Schedule',
        'Improved Keywords',
        'Average Position',
        'OPD 1-3',
        'OPD 4-10', 
        'OPD 11-20',
        'OPD 21-50',
        'OPD 51-100',
        'Status',
        'Last Updated',
        'Labels'
      ]);

      // Extract index page data
      const rows = document.querySelectorAll('table tbody tr');
      rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 1) {
          const rowData: string[] = [];
          cells.forEach((cell, index) => {
            // Skip checkbox and action columns
            if (index === 0 || index === cells.length - 1) return;
            
            const text = cell.textContent?.trim() || '';
            rowData.push(text);
          });
          
          if (rowData.length > 0) {
            csvData.push(rowData);
          }
        }
      });
    }

    // Restore original expanded state
    wasExpanded.forEach(button => {
      const clickableButton = button.querySelector('button');
      if (clickableButton) {
        clickableButton.click();
      }
    });

    // Convert to CSV format
    const csvContent = csvData
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'serp-data-export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating CSV:', error);
    throw error;
  }
};