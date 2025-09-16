// Google Apps Script 코드
// 이 코드를 Google Sheets의 Apps Script 편집기에 복사하여 사용하세요

function doPost(e) {
  try {
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    
    // Google Sheets 열기
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // 헤더가 없는 경우 헤더 추가 (첫 번째 행)
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([
        ['이름', '이메일', '연락처', '메시지', '제출시간']
      ]);
      // 헤더 스타일링
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      sheet.getRange(1, 1, 1, 5).setBackground('#f0f0f0');
    }
    
    // 새 행에 데이터 추가 (2행부터 시작)
    const newRow = [
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      data.timestamp || new Date().toLocaleString('ko-KR')
    ];
    
    sheet.appendRow(newRow);
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: '데이터가 성공적으로 저장되었습니다.'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // GET 요청 처리 (테스트용)
  return ContentService
    .createTextOutput(JSON.stringify({message: 'Google Sheets API가 정상적으로 작동합니다.'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// 테스트 함수
function testFunction() {
  const testData = {
    name: '테스트 사용자',
    email: 'test@example.com',
    phone: '010-1234-5678',
    message: '테스트 메시지입니다.',
    timestamp: new Date().toLocaleString('ko-KR')
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log(result.getContent());
}
