import sys
import json
import os

def main():
    try:
        # Read JSON from stdin
        input_data = sys.stdin.read()
        if not input_data:
            print(json.dumps({"error": "No input provided", "mock": True}))
            return

        data = json.loads(input_data)
        
        # Exact 5 parameters: studytime, failures, absences, G1, G2
        features = [
            float(data.get('studytime', 0)),
            float(data.get('failures', 0)),
            float(data.get('absences', 0)),
            float(data.get('G1', 0)),
            float(data.get('G2', 0))
        ]
        
        model_path = os.path.join(os.path.dirname(__file__), 'models', 'random_forest_model.pkl')
        if not os.path.exists(model_path):
            model_path = os.path.join(os.path.dirname(__file__), 'models', 'decision_tree_model.pkl')
            
        if not os.path.exists(model_path):
            print(json.dumps({"error": "No model files found in existing models directory", "mock": True, "features": features}))
            return

        # Try loading with joblib first, fallback to pickle
        try:
            import joblib
            model = joblib.load(model_path)
        except ImportError:
            import pickle
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
        
        prediction = model.predict([features])
        
        # Convert prediction numpy array to standard python list for JSON serialization
        pred_value = prediction.tolist() if hasattr(prediction, 'tolist') else list(prediction)
        
        print(json.dumps({
            "success": True, 
            "prediction": pred_value,
            "features": features
        }))
        
    except Exception as e:
        print(json.dumps({"error": str(e), "mock": True}))

if __name__ == '__main__':
    main()
