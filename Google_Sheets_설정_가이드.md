# Google Sheets 연동 설정 가이드

## 1. Google Sheets 설정

### 1.1 스프레드시트 준비
1. 제공된 Google Sheets 링크로 이동: https://docs.google.com/spreadsheets/d/1oxHVID_nal8M7KpHF3-7eT3Nt2GvgeWuTyI4xUVVCgk/edit?usp=sharing
2. 첫 번째 행에 헤더 추가 (자동으로 추가됩니다):
   - A1: 이름
   - B1: 이메일  
   - C1: 연락처
   - D1: 메시지
   - E1: 제출시간

### 1.2 Google Apps Script 설정
1. Google Sheets에서 `확장 프로그램` → `Apps Script` 클릭
2. 기존 코드를 모두 삭제하고 `google-apps-script.js` 파일의 내용을 복사
3. `Ctrl + S`로 저장
4. 프로젝트 이름을 "Contact Form Handler"로 변경

### 1.3 웹 앱 배포
1. Apps Script 편집기에서 `배포` → `새 배포` 클릭
2. 설정:
   - 유형: 웹 앱
   - 설명: Contact Form Data Handler
   - 실행 대상: 나
   - 액세스 권한: 모든 사용자
3. `배포` 클릭
4. 권한 승인 (Google 계정 로그인 필요)
5. **중요**: 웹 앱 URL을 복사하여 저장

## 2. HTML 파일 수정

### 2.1 스크립트 URL 업데이트
`index.html` 파일에서 다음 라인을 찾아 수정:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYOUR_SCRIPT_ID/exec';
```

복사한 웹 앱 URL로 교체:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz실제_스크립트_ID/exec';
```

## 3. 테스트

### 3.1 Apps Script 테스트
1. Apps Script 편집기에서 `testFunction` 함수 선택
2. `실행` 버튼 클릭
3. 권한 승인 후 테스트 데이터가 스프레드시트에 추가되는지 확인

### 3.2 웹사이트 테스트
1. `index.html` 파일을 브라우저에서 열기
2. 연락처 폼에 테스트 데이터 입력:
   - 이름: 테스트
   - 이메일: test@example.com
   - 연락처: 010-1234-5678
   - 메시지: 테스트 메시지
3. "메시지 보내기" 버튼 클릭
4. Google Sheets에서 데이터가 추가되었는지 확인

## 4. 문제 해결

### 4.1 CORS 오류
- `mode: 'no-cors'`가 설정되어 있어 CORS 오류는 무시됩니다
- 실제 데이터 전송은 정상적으로 작동합니다

### 4.2 권한 오류
- Google 계정에 스프레드시트 편집 권한이 있는지 확인
- Apps Script 실행 권한을 다시 승인

### 4.3 스크립트 URL 오류
- 웹 앱 배포 후 생성된 URL이 정확한지 확인
- URL에 `exec`가 포함되어 있는지 확인

## 5. 보안 고려사항

### 5.1 스프레드시트 공유 설정
- 스프레드시트를 "링크가 있는 모든 사용자"로 공유 설정
- 또는 특정 이메일 주소로만 공유

### 5.2 데이터 검증
- 현재 기본적인 클라이언트 사이드 검증만 구현
- 필요시 서버 사이드 검증 추가 가능

## 6. 추가 기능

### 6.1 이메일 알림
Apps Script에 다음 코드 추가하여 새 메시지 시 이메일 알림:

```javascript
// doPost 함수 내부에 추가
if (data.email) {
  MailApp.sendEmail({
    to: 'your-email@gmail.com',
    subject: '새로운 연락처 메시지',
    body: `이름: ${data.name}\n이메일: ${data.email}\n연락처: ${data.phone}\n메시지: ${data.message}`
  });
}
```

### 6.2 데이터 정리
정기적으로 오래된 데이터를 정리하는 함수:

```javascript
function cleanupOldData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - 6); // 6개월 이전 데이터 삭제
  
  // 데이터 정리 로직 구현
}
```
