#!/usr/bin/env python3
"""
Comprehensive backend API testing for Visa Card Benefits AI Agent
Tests all API endpoints with proper error handling and assertions.
"""

import requests
import sys
import json
from datetime import datetime

class VisaBenefitsAPITester:
    def __init__(self, base_url="https://visa-benefits-ai.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None, validate_fn=None):
        """Run a single API test with comprehensive validation"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {method} {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            
            print(f"   Status: {response.status_code}")
            
            success = response.status_code == expected_status
            response_data = {}
            
            if success:
                try:
                    response_data = response.json()
                    print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Non-dict response'}")
                    
                    # Run custom validation if provided
                    if validate_fn:
                        validation_result = validate_fn(response_data)
                        if not validation_result:
                            success = False
                            print(f"   ❌ Validation failed")
                        else:
                            print(f"   ✅ Validation passed")
                except json.JSONDecodeError as e:
                    print(f"   ⚠️ Invalid JSON response: {e}")
                    success = False
            
            if success:
                self.tests_passed += 1
                print(f"   ✅ PASSED")
            else:
                print(f"   ❌ FAILED - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Error: {response.text[:200]}...")
                self.failed_tests.append({
                    "name": name, 
                    "expected": expected_status, 
                    "actual": response.status_code,
                    "error": response.text[:200] if response.text else "No error details"
                })

            return success, response_data

        except Exception as e:
            print(f"   ❌ FAILED - Error: {str(e)}")
            self.failed_tests.append({"name": name, "error": str(e)})
            return False, {}

    def validate_cards_response(self, data):
        """Validate cards endpoint response"""
        if not isinstance(data, dict) or 'cards' not in data:
            return False
        cards = data['cards']
        if not isinstance(cards, list) or len(cards) != 5:
            return False
        
        required_fields = ['id', 'name', 'tier', 'tagline', 'annual_fee', 'benefit_count']
        for card in cards:
            for field in required_fields:
                if field not in card:
                    print(f"Missing field '{field}' in card")
                    return False
        return True

    def validate_gold_card_response(self, data):
        """Validate gold card has 8 benefits"""
        if not isinstance(data, dict) or 'benefits' not in data:
            return False
        if len(data['benefits']) != 8:
            print(f"Gold card should have 8 benefits, found {len(data['benefits'])}")
            return False
        return True

    def validate_languages_response(self, data):
        """Validate languages endpoint returns 25+ languages"""
        if not isinstance(data, dict) or 'languages' not in data:
            return False
        languages = data['languages']
        if not isinstance(languages, list) or len(languages) < 25:
            print(f"Should have 25+ languages, found {len(languages)}")
            return False
        return True

    def validate_benefits_response(self, data):
        """Validate benefits endpoint response structure"""
        if not isinstance(data, dict):
            return False
        required_fields = ['card_id', 'card_name', 'benefits', 'total']
        for field in required_fields:
            if field not in data:
                print(f"Missing field '{field}' in benefits response")
                return False
        return True

    def validate_ai_summary_response(self, data):
        """Validate AI summary response"""
        if not isinstance(data, dict) or 'summaries' not in data:
            return False
        summaries = data['summaries']
        if not isinstance(summaries, list) or len(summaries) == 0:
            return False
        
        summary = summaries[0]
        required_fields = ['benefit_id', 'benefit_title', 'category', 'summary', 'language']
        for field in required_fields:
            if field not in summary:
                print(f"Missing field '{field}' in AI summary")
                return False
        
        # Check if summary is a string and not empty
        if not isinstance(summary['summary'], str) or len(summary['summary']) < 10:
            print(f"AI summary too short or invalid: {summary['summary']}")
            return False
        return True

    def validate_chat_response(self, data):
        """Validate AI chat response"""
        if not isinstance(data, dict):
            return False
        required_fields = ['response', 'session_id']
        for field in required_fields:
            if field not in data:
                print(f"Missing field '{field}' in chat response")
                return False
        
        if not isinstance(data['response'], str) or len(data['response']) < 5:
            print(f"AI chat response too short or invalid: {data['response']}")
            return False
        return True

    def validate_comparison_response(self, data):
        """Validate card comparison response"""
        if not isinstance(data, dict) or 'comparison' not in data:
            return False
        comparison = data['comparison']
        if not isinstance(comparison, list) or len(comparison) != 2:
            print(f"Comparison should have 2 cards, found {len(comparison)}")
            return False
        return True

    def validate_recommendation_response(self, data):
        """Validate recommendation response"""
        if not isinstance(data, dict):
            return False
        required_fields = ['recommendation', 'context_message']
        for field in required_fields:
            if field not in data:
                print(f"Missing field '{field}' in recommendation response")
                return False
        return True

    def run_all_tests(self):
        """Run comprehensive test suite"""
        print("=" * 70)
        print("🚀 STARTING VISA BENEFITS API TEST SUITE")
        print("=" * 70)
        
        # Test 1: Basic API health
        self.run_test("API Root", "GET", "", 200)
        
        # Test 2: Get all cards (should return 5 card types)
        self.run_test(
            "Get All Cards",
            "GET", 
            "cards", 
            200,
            validate_fn=self.validate_cards_response
        )
        
        # Test 3: Get gold card (should have 8 benefits)
        self.run_test(
            "Get Gold Card",
            "GET",
            "cards/gold",
            200,
            validate_fn=self.validate_gold_card_response
        )
        
        # Test 4: Get gold card benefits
        self.run_test(
            "Get Gold Card Benefits",
            "GET",
            "cards/gold/benefits",
            200,
            validate_fn=self.validate_benefits_response
        )
        
        # Test 5: Get gold card benefits with Travel filter
        self.run_test(
            "Get Gold Card Benefits - Travel Category",
            "GET",
            "cards/gold/benefits",
            200,
            params={"category": "Travel"},
            validate_fn=self.validate_benefits_response
        )
        
        # Test 6: Get languages (should return 25+ languages)
        self.run_test(
            "Get Supported Languages",
            "GET",
            "languages",
            200,
            validate_fn=self.validate_languages_response
        )
        
        # Test 7: Get benefit categories
        self.run_test(
            "Get Benefit Categories",
            "GET",
            "categories",
            200
        )
        
        # Test 8: AI Benefits Summarization
        print(f"\n⏳ Testing AI functionality (may take 5-10 seconds)...")
        self.run_test(
            "AI Benefits Summary",
            "POST",
            "benefits/summarize",
            200,
            data={
                "card_id": "gold",
                "benefit_id": "gold_travel_insurance",
                "language": "en"
            },
            validate_fn=self.validate_ai_summary_response
        )
        
        # Test 9: AI Chat functionality
        print(f"\n⏳ Testing AI Chat (may take 5-10 seconds)...")
        self.run_test(
            "AI Chat",
            "POST",
            "chat",
            200,
            data={
                "card_id": "gold",
                "message": "What travel benefits do I have?",
                "language": "en"
            },
            validate_fn=self.validate_chat_response
        )
        
        # Test 10: Card comparison
        self.run_test(
            "Card Comparison",
            "POST",
            "cards/compare",
            200,
            data={"card_ids": ["gold", "platinum"]},
            validate_fn=self.validate_comparison_response
        )
        
        # Test 11: Contextual recommendations
        self.run_test(
            "Contextual Recommendation",
            "GET",
            "cards/gold/recommend",
            200,
            params={"context": "flight"},
            validate_fn=self.validate_recommendation_response
        )
        
        # Error handling tests
        print(f"\n🔍 Testing Error Handling...")
        
        # Test invalid card ID
        self.run_test("Invalid Card ID", "GET", "cards/invalid", 404)
        
        # Test invalid benefit summarization
        self.run_test(
            "Invalid Benefit Summary",
            "POST", 
            "benefits/summarize",
            404,
            data={"card_id": "invalid", "benefit_id": "test", "language": "en"}
        )

        # Print final results
        self.print_results()
        return self.tests_passed == self.tests_run

    def print_results(self):
        """Print comprehensive test results"""
        print("\n" + "=" * 70)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 70)
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {success_rate:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for i, test in enumerate(self.failed_tests, 1):
                print(f"  {i}. {test['name']}")
                if 'expected' in test and 'actual' in test:
                    print(f"     Expected: {test['expected']}, Got: {test['actual']}")
                if 'error' in test:
                    print(f"     Error: {test['error']}")
        else:
            print(f"\n🎉 ALL TESTS PASSED!")
        
        print("=" * 70)

def main():
    """Main test execution"""
    print("🏗️ Starting Visa Benefits API Backend Testing...")
    
    # Initialize tester with public endpoint
    tester = VisaBenefitsAPITester()
    
    # Run all tests
    all_passed = tester.run_all_tests()
    
    # Exit with appropriate code
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())