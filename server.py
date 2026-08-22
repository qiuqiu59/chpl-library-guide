import os
import json
from datetime import datetime
from flask import Flask, send_from_directory, request, jsonify
import plotly.graph_objects as go

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=BASE_DIR, static_url_path='')

DATA_DIR = os.path.join(BASE_DIR, 'data')
os.makedirs(DATA_DIR, exist_ok=True)

FEEDBACK_FILE = os.path.join(DATA_DIR, 'feedback.json')
SETTINGS_FILE = os.path.join(DATA_DIR, 'creator_settings.json')

def load_json(filepath, default):
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return default
    return default

def save_json(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route('/')
def serve_index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/healthz')
def health_check():
    return jsonify({'status': 'healthy', 'service': 'chpl-fullstack-guide', 'timestamp': datetime.utcnow().isoformat()}), 200

@app.route('/<path:filename>')
def serve_static_files(filename):
    file_path = os.path.join(BASE_DIR, filename)
    if os.path.isfile(file_path):
        return send_from_directory(BASE_DIR, filename)
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/budget-data', methods=['GET'])
def get_budget_data():
    data = {
        'title': 'Chapel Hill Public Library (CHPL) Adopted Budget Breakdown',
        'fiscal_year': 'FY 2025-26',
        'total_budget': 4982545,
        'personnel_costs': 3902677,
        'operating_and_books': 1079868,
        'books_materials_budget': 305000,
        'books_budget_share_pct': 6.1,
        'state_recommended_share_pct': 10.0,
        'tech_lending_units_previous': 1925,
        'tech_lending_units_current': 671,
        'historical_trajectory': [
            {'year': 'FY 2023-24 (Actual)', 'amount_k': 4535.4},
            {'year': 'FY 2024-25 (Adopted)', 'amount_k': 4753.9},
            {'year': 'FY 2024-25 (Revised)', 'amount_k': 4758.6},
            {'year': 'FY 2024-25 (Estimated)', 'amount_k': 4659.2},
            {'year': 'FY 2025-26 (Adopted)', 'amount_k': 4982.5}
        ],
        'revenue_sources': {
            'town_taxes': {'amount': 4191722, 'share_pct': 84.1},
            'county_state_grants': {'amount': 660323, 'share_pct': 13.3},
            'printing_service_fees': {'amount': 72000, 'share_pct': 1.4},
            'other_revenue': {'amount': 13500, 'share_pct': 0.3},
            'gift_fund_transfer': {'amount': 45000, 'share_pct': 0.9}
        }
    }
    return jsonify(data)

@app.route('/api/simulate', methods=['POST'])
def simulate_budget():
    payload = request.get_json() or {}
    county_k = float(payload.get('county_k', 50))
    grants_k = float(payload.get('grants_k', 75))
    facility_k = float(payload.get('facility_k', 25))
    endowment_k = float(payload.get('endowment_k', 30))

    total_new_dollars = (county_k + grants_k + facility_k + endowment_k) * 1000.0
    new_total_budget = 4982545.0 + total_new_dollars
    new_collection_budget = 305000.0 + (total_new_dollars * 0.65)
    collection_share_pct = round((new_collection_budget / new_total_budget) * 100.0, 1)
    extra_items_estimate = int(total_new_dollars / 125.0)

    return jsonify({
        'total_new_dollars': total_new_dollars,
        'new_total_budget': new_total_budget,
        'new_collection_budget': new_collection_budget,
        'collection_share_pct': collection_share_pct,
        'extra_items_estimate': extra_items_estimate,
        'reaches_benchmark': collection_share_pct >= 10.0
    })

@app.route('/api/plotly/chart/<chart_type>', methods=['GET'])
def get_plotly_chart(chart_type):
    if chart_type == 'trajectory':
        fig = go.Figure()
        fig.add_trace(go.Scatter(
            x=['FY 2023-24 (Actual)', 'FY 2024-25 (Adopted)', 'FY 2024-25 (Revised)', 'FY 2024-25 (Estimated)', 'FY 2025-26 (Adopted)'],
            y=[4535.4, 4753.9, 4758.6, 4659.2, 4982.5],
            mode='lines+markers+text',
            name='CHPL Total Budget ()',
            line=dict(color='#2563eb', width=3),
            marker=dict(size=[10, 8, 8, 8, 12], color=['#1e293b', '#2563eb', '#2563eb', '#2563eb', '#ef4444']),
            text=[',535K', ',754K', ',759K', ',659K', ',983K'],
            textposition='top center'
        ))
        fig.update_layout(title='CHPL Budget Trajectory ($ Thousands)', height=400)
        return jsonify(json.loads(fig.to_json()))

    elif chart_type == 'sources':
        fig = go.Figure()
        years = ['FY23-24 Actual', 'FY24-25 Adopted', 'FY24-25 Estimated', 'FY25-26 Adopted']
        fig.add_trace(go.Bar(name='Town General Fund', x=years, y=[3746.3, 3971.8, 3873.1, 4191.7], marker_color='#2563eb'))
        fig.add_trace(go.Bar(name='County/State Grants', x=years, y=[660.1, 660.1, 660.1, 660.3], marker_color='#0d9488'))
        fig.add_trace(go.Bar(name='Printing/Service Fees', x=years, y=[84.0, 77.0, 81.0, 85.5], marker_color='#f59e0b'))
        fig.add_trace(go.Bar(name='Gift Fund Transfer', x=years, y=[45.0, 45.0, 45.0, 45.0], marker_color='#8b5cf6'))
        fig.update_layout(barmode='stack', title='CHPL Multi-Year Revenue Sources ($ Thousands)', height=400)
        return jsonify(json.loads(fig.to_json()))

    elif chart_type == 'expenses':
        fig = go.Figure(go.Pie(
            labels=['Personnel (Staff & Benefits)', 'Operating, Books & Facilities'],
            values=[3902.7, 1079.9],
            hole=0.55,
            marker=dict(colors=['#ef4444', '#3b82f6']),
            textinfo='label+percent'
        ))
        fig.update_layout(title='CHPL Expenses: Personnel vs. Books & Operations', height=400)
        return jsonify(json.loads(fig.to_json()))

    return jsonify({'error': 'Unknown chart type'}), 400

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    payload = request.get_json() or {}
    category = payload.get('category', 'General Thoughts')
    message = payload.get('message', '').strip()
    sender_email = payload.get('email', '').strip()
    rating = payload.get('rating', 5)

    if not message:
        return jsonify({'success': False, 'error': 'Message cannot be empty'}), 400

    entry = {
        'id': int(datetime.utcnow().timestamp() * 1000),
        'category': category,
        'message': message,
        'senderEmail': sender_email,
        'rating': rating,
        'date': datetime.utcnow().isoformat()
    }

    feedbacks = load_json(FEEDBACK_FILE, [])
    feedbacks.append(entry)
    save_json(FEEDBACK_FILE, feedbacks)

    return jsonify({
        'success': True,
        'message': 'Feedback received and securely stored on server!',
        'entry': entry
    })

@app.route('/api/feedback', methods=['GET'])
def get_all_feedback():
    feedbacks = load_json(FEEDBACK_FILE, [])
    return jsonify(feedbacks)

@app.route('/api/feedback/clear', methods=['POST'])
def clear_feedback():
    save_json(FEEDBACK_FILE, [])
    return jsonify({'success': True, 'message': 'Feedback cleared successfully'})

DEFAULT_CREATOR_SETTINGS = {
    'sections': {
        'overview': True,
        'what-happened': True,
        'charts': True,
        'simulator': True,
        'plan': True,
        'how-to-help': True,
        'feedback': True,
        'resources': True
    },
    'announcement': '',
    'custom_cards': [],
    'inserted_images': []
}

@app.route('/api/creator/settings', methods=['GET'])
def get_creator_settings():
    settings = load_json(SETTINGS_FILE, DEFAULT_CREATOR_SETTINGS)
    return jsonify(settings)

@app.route('/api/creator/settings', methods=['POST'])
def update_creator_settings():
    payload = request.get_json() or {}
    pin = payload.get('pin', '')
    
    saved_pin = os.environ.get('CREATOR_PIN', '1357')
    if str(pin) != str(saved_pin):
        return jsonify({'success': False, 'error': 'Unauthorized: Invalid PIN'}), 403

    current = load_json(SETTINGS_FILE, DEFAULT_CREATOR_SETTINGS)
    if 'sections' in payload:
        current['sections'] = payload['sections']
    if 'announcement' in payload:
        current['announcement'] = payload['announcement']
    if 'custom_cards' in payload:
        current['custom_cards'] = payload['custom_cards']
    if 'inserted_images' in payload:
        current['inserted_images'] = payload['inserted_images']

    save_json(SETTINGS_FILE, current)
    return jsonify({'success': True, 'settings': current})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    print(f'🚀 CHPL Full-Stack Server running on http://0.0.0.0:{port}')
    app.run(host='0.0.0.0', port=port, debug=True)
