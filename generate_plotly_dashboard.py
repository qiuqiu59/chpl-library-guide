import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Create comprehensive 3-panel interactive Plotly Dashboard
fig = make_subplots(
    rows=2, cols=2,
    specs=[[{"colspan": 2, "type": "xy"}, None], [{"type": "xy"}, {"type": "domain"}]],
    subplot_titles=(
        "1. Public Library Budget Trajectory ($ Thousands)",
        "2. Multi-Year Revenue Sources Breakdown",
        "3. Personnel vs. Operating Expense Share (FY 2025-26)"
    ),
    vertical_spacing=0.16,
    horizontal_spacing=0.12
)

# 1. Main Line Trajectory Trace
years_line = ['FY 2023-24 (Actual)', 'FY 2024-25 (Adopted)', 'FY 2024-25 (Revised)', 'FY 2024-25 (Estimated)', 'FY 2025-26 (Adopted)']
budget_vals = [4535.4, 4753.9, 4758.6, 4659.2, 4982.5]

fig.add_trace(
    go.Scatter(
        x=years_line,
        y=budget_vals,
        mode='lines+markers+text',
        name='Budget Trajectory',
        line=dict(color='#5d72a7', width=3),
        marker=dict(
            size=[10, 8, 8, 8, 12],
            color=['#1e293b', '#5d72a7', '#5d72a7', '#5d72a7', '#e53e3e'],
            symbol=['x', 'circle', 'circle', 'circle', 'triangle-up']
        ),
        text=['', '$4,754K', '$4,759K', '$4,659K', ''],
        textposition='top center',
        hovertemplate='<b>%{x}</b><br>Total Budget: $%{y:,.1f}K<extra></extra>'
    ),
    row=1, col=1
)

# Trajectory Annotations
fig.add_annotation(
    x='FY 2025-26 (Adopted)', y=4982.5,
    text='<b>↑ highest ($4,983K)</b>',
    showarrow=True, arrowhead=0, arrowcolor='#e53e3e',
    ax=0, ay=-40,
    bgcolor='rgba(254, 242, 242, 0.9)',
    bordercolor='#fca5a5',
    row=1, col=1
)
fig.add_annotation(
    x='FY 2023-24 (Actual)', y=4535.4,
    text='<b>↓ lowest ($4,535K)</b>',
    showarrow=True, arrowhead=0, arrowcolor='#1e293b',
    ax=0, ay=40,
    bgcolor='rgba(241, 245, 249, 0.9)',
    bordercolor='#cbd5e1',
    row=1, col=1
)

# 2. Stacked Bar Chart for Revenue Sources
years_bar = ['FY23-24 Actual', 'FY24-25 Adopted', 'FY24-25 Estimated', 'FY25-26 Adopted']
fig.add_trace(go.Bar(name='Town General Fund', x=years_bar, y=[3746.3, 3971.8, 3873.1, 4191.7], marker_color='#2563eb'), row=2, col=1)
fig.add_trace(go.Bar(name='County/State Grants', x=years_bar, y=[660.1, 660.1, 660.1, 660.3], marker_color='#0d9488'), row=2, col=1)
fig.add_trace(go.Bar(name='Charges/Other Fees', x=years_bar, y=[84.0, 77.0, 81.0, 85.5], marker_color='#f59e0b'), row=2, col=1)
fig.add_trace(go.Bar(name='Gift Fund Transfer', x=years_bar, y=[45.0, 45.0, 45.0, 45.0], marker_color='#8b5cf6'), row=2, col=1)

# 3. Donut Chart for Expense Allocation
fig.add_trace(
    go.Pie(
        labels=['Personnel (Salaries & Benefits)', 'Operating, Books & Facilities'],
        values=[3902.7, 1079.9],
        hole=0.55,
        marker=dict(colors=['#ef4444', '#3b82f6']),
        hovertemplate='<b>%{label}</b><br>Amount: $%{value:,.1f}K (%{percent})<extra></extra>',
        textinfo='label+percent'
    ),
    row=2, col=2
)

# Layout adjustments
fig.update_layout(
    title_text="<b>Chapel Hill Public Library - Interactive Financial Dashboard</b>",
    title_font_size=20,
    paper_bgcolor='#ffffff',
    plot_bgcolor='#ffffff',
    barmode='stack',
    height=880,
    font=dict(family='Plus Jakarta Sans, Arial, sans-serif', color='#334155'),
    showlegend=True,
    legend=dict(orientation='h', yanchor='bottom', y=-0.12, xanchor='center', x=0.5)
)

fig.update_yaxes(title_text="$ Thousands", range=[4400, 5200], gridcolor='#e2e8f0', row=1, col=1)
fig.update_yaxes(title_text="$ Thousands", gridcolor='#e2e8f0', row=2, col=1)

fig.write_html('library_plotly_dashboard.html')
print('Plotly dashboard generated successfully as library_plotly_dashboard.html')
