"""API regression tests for catalog retrieval and newsletter subscription flows."""

import os
import uuid

import pytest
import requests


# Base app URL from environment (must be exported before pytest run)
BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")


@pytest.fixture(scope="session")
def api_client():
    """Shared HTTP client for public API checks."""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture(scope="session", autouse=True)
def require_base_url():
    """Skip suite cleanly when test env is not exported."""
    if not BASE_URL:
        pytest.skip("REACT_APP_BACKEND_URL is not set in environment")


# Catalog module coverage: collection + item retrieval contract
def test_get_products_returns_20_serialized_records(api_client):
    response = api_client.get(f"{BASE_URL}/api/products", timeout=30)
    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 20

    first = data[0]
    assert first["id"] == "VEL-RN-101"
    assert isinstance(first["metals"], list)
    assert isinstance(first["sizes"], list)
    assert "_id" not in first


def test_get_product_by_known_id(api_client):
    response = api_client.get(f"{BASE_URL}/api/products/VEL-RN-101", timeout=30)
    assert response.status_code == 200

    data = response.json()
    assert data["id"] == "VEL-RN-101"
    assert data["name"] == "Floral Diamond Blossom Ring"
    assert data["category"] == "Rings"


def test_get_product_unknown_id_returns_404(api_client):
    response = api_client.get(f"{BASE_URL}/api/products/VEL-UNKNOWN-999", timeout=30)
    assert response.status_code == 404

    data = response.json()
    assert data["detail"] == "This creation could not be found."


# Newsletter module coverage: validation, consent, and idempotent duplicate behavior
def test_newsletter_valid_subscription_then_duplicate_idempotent(api_client):
    email = f"test_velaro_{uuid.uuid4().hex[:10]}@example.com"
    payload = {"email": email, "consent": True}

    create_response = api_client.post(f"{BASE_URL}/api/newsletter", json=payload, timeout=30)
    assert create_response.status_code == 200
    create_data = create_response.json()
    assert create_data["message"] == "You’re on the list. Welcome to the VELARO Collector’s Circle."

    duplicate_response = api_client.post(f"{BASE_URL}/api/newsletter", json=payload, timeout=30)
    assert duplicate_response.status_code == 200
    duplicate_data = duplicate_response.json()
    assert duplicate_data["message"] == "You’re on the list. Welcome to the VELARO Collector’s Circle."


def test_newsletter_rejects_invalid_email(api_client):
    response = api_client.post(
        f"{BASE_URL}/api/newsletter",
        json={"email": "not-an-email", "consent": True},
        timeout=30,
    )
    assert response.status_code == 422

    data = response.json()
    assert "detail" in data


def test_newsletter_rejects_false_consent(api_client):
    response = api_client.post(
        f"{BASE_URL}/api/newsletter",
        json={"email": f"no_consent_{uuid.uuid4().hex[:8]}@example.com", "consent": False},
        timeout=30,
    )
    assert response.status_code == 400

    data = response.json()
    assert data["detail"] == "Please agree to receive private collection news."
